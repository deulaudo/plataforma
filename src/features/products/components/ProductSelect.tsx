"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, ChevronUp, Loader, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { productService } from "@/services/productService";
import { useAuthStore } from "@/stores/authStore";
import { ProductType } from "@/types/productType";

type ProductSelectProps = {
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
};

const ProductSelect = ({
  placeholder = "Selecione um produto",
  disabled = false,
  error,
  label,
}: ProductSelectProps) => {
  const { user } = useAuthStore();
  const { selectedProduct, selectProduct, isProductSelected } =
    useSelectedProduct();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProductForModal, setSelectedProductForModal] =
    useState<ProductType | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: products, isPending } = useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: productService.listProducts,
  });

  const sortedProducts = products?.sort((a) =>
    user?.products.some((p) => p.id === a.id) ? -1 : 1,
  );

  const onSelect = useCallback(
    (product: ProductType) => {
      selectProduct(product);
    },
    [selectProduct],
  );

  const buyProductMutation = useMutation<{ id: string; link: string }>({
    mutationFn: async () => {
      return await productService.buyProduct({
        productId: selectedProductForModal!.id,
        userId: user!.id,
      });
    },
    onSuccess: (data) => {
      // Redirecionar para o link de compra retornado pela API
      window.location.href = data.link;
    },
    onError: () => {
      toast.error("Não foi possível iniciar a compra do produto");
    },
  });

  const userOwnsProduct = useCallback(
    (productId: string) => {
      return (
        user?.products?.some((userProduct) => userProduct.id === productId) ||
        false
      );
    },
    [user?.products],
  );

  const getFirstOwnedProduct = useCallback(() => {
    if (!products || !user?.products) return null;

    for (const product of products) {
      if (userOwnsProduct(product.id)) {
        return product;
      }
    }
    return null;
  }, [products, user?.products, userOwnsProduct]);

  // Lógica para selecionar automaticamente um produto
  useEffect(() => {
    if (!products || !user?.products) return;

    // Se já existe um produto selecionado no store e o usuário possui esse produto, mantém selecionado
    if (selectedProduct && userOwnsProduct(selectedProduct.id)) {
      return;
    }

    // Se não há produto selecionado ou o usuário não possui o produto selecionado,
    // seleciona o primeiro produto que o usuário possui
    const firstOwnedProduct = getFirstOwnedProduct();
    if (firstOwnedProduct) {
      onSelect(firstOwnedProduct);
    }
  }, [
    products,
    user?.products,
    selectedProduct,
    userOwnsProduct,
    getFirstOwnedProduct,
    onSelect,
  ]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProductSelect = (product: ProductType) => {
    if (user?.role === "ADMIN") {
      // Se for admin, selecionar normalmente
      onSelect(product);
      setIsOpen(false);
      return;
    }

    // Se o usuário não possui o produto, abrir modal
    if (!userOwnsProduct(product.id)) {
      setSelectedProductForModal(product);
      setIsProductModalOpen(true);
      setIsOpen(false);
      return;
    }

    // Se possui o produto, selecionar normalmente
    onSelect(product);
    setIsOpen(false);
  };

  const handleAcquireProduct = () => {
    if (!selectedProductForModal || !user) return;
    buyProductMutation.mutate();
  };

  const handleCloseModal = () => {
    setIsProductModalOpen(false);
    setSelectedProductForModal(null);
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full" ref={containerRef}>
        {label && (
          <label
            className={twMerge(
              "font-bold text-xs text-black dark:text-white",
              error ? "text-red-500" : "",
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Campo de seleção */}
          <div
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={twMerge(
              "flex items-center justify-between w-full h-[48px] px-[16px] rounded-[20px]",
              "border-2 dark:border-[#FFFFFF0D] border-[#0000000D]",
              "dark:bg-[#182031] bg-[#0000000D]",
              "cursor-pointer transition-all duration-200",
              !disabled && "hover:border-[#2056F2]",
              isOpen && "border-[#2056F2]",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-red-500",
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={twMerge(
                  "text-[14px] max-w-[150px] truncate",
                  selectedProduct
                    ? "dark:text-white text-black"
                    : "dark:text-[#FFFFFF40] text-[#00000080]",
                )}
              >
                {selectedProduct ? selectedProduct.name : placeholder}
              </span>
            </div>

            {isPending ? (
              <Loader
                className="animate-spin dark:text-[#FFFFFF40] text-[#00000080]"
                size={16}
              />
            ) : (
              <>
                {isOpen ? (
                  <ChevronUp
                    className="dark:text-[#FFFFFF40] text-[#00000080]"
                    size={16}
                  />
                ) : (
                  <ChevronDown
                    className="dark:text-[#FFFFFF40] text-[#00000080]"
                    size={16}
                  />
                )}
              </>
            )}
          </div>

          {/* Dropdown com lista de produtos */}
          {isOpen && !disabled && products && (
            <div
              className={twMerge(
                "absolute top-full left-0 w-full max-h-[200px] overflow-y-auto mt-1 rounded-[20px] p-[8px]",
                "border dark:border-[#FFFFFF0D] border-[#0000000D]",
                "dark:bg-[#182031] bg-white",
                "shadow-lg z-50",
              )}
            >
              {products.length === 0 ? (
                <div className="p-[12px] text-center dark:text-[#FFFFFF40] text-[#00000080] text-[12px]">
                  Nenhum produto encontrado
                </div>
              ) : (
                (sortedProducts || products).map((product) => {
                  const isOwned = userOwnsProduct(product.id);

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className={twMerge(
                        "flex flex-col gap-1 p-[12px] rounded-[16px] cursor-pointer transition-all duration-200",
                        "hover:dark:bg-[#FFFFFF0D] hover:bg-[#F5F5F5]",
                        isProductSelected(product.id) &&
                          "dark:bg-[#FFFFFF0D] bg-[#F5F5F5]",
                        // Destacar produtos que o usuário possui
                        isOwned && "ring-1 ring-[#1CD475] dark:ring-[#1CD475]",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[14px] dark:text-white text-black">
                          {product.name}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>

      {/* Modal de Produto Não Possuído */}
      <AlertDialog
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
      >
        <AlertDialogContent className="max-w-[500px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Adquira já seu produto</AlertDialogTitle>
          </AlertDialogHeader>

          {selectedProductForModal && (
            <div className="flex flex-col gap-6">
              {/* Informações do Produto */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-[18px] dark:text-white text-black">
                    {selectedProductForModal.name}
                  </h3>

                  <div className="flex items-center gap-4 text-[14px] dark:text-[#FFFFFF80] text-[#00000080]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[16px] text-[#2056F2]">
                        R$ {selectedProductForModal.price.toFixed(2)}
                      </span>
                    </div>
                    <span>•</span>
                    <span>
                      {selectedProductForModal.accessTime} dias de acesso
                    </span>
                  </div>
                </div>

                {/* Modos do Produto */}
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-[12px] dark:text-[#FFFFFF80] text-[#00000080]">
                    Recursos inclusos:
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProductForModal.modes.flashcards && (
                      <span className="text-[10px] px-[8px] py-[4px] rounded-[12px] dark:bg-[#1CD475] bg-[#1CD475] text-white font-medium">
                        Flashcards
                      </span>
                    )}
                    {selectedProductForModal.modes.exam && (
                      <span className="text-[10px] px-[8px] py-[4px] rounded-[12px] dark:bg-[#2056F2] bg-[#2056F2] text-white font-medium">
                        Modo Prova
                      </span>
                    )}
                    {selectedProductForModal.modes.course && (
                      <span className="text-[10px] px-[8px] py-[4px] rounded-[12px] dark:bg-[#E7BD16] bg-[#E7BD16] text-white font-medium">
                        Vídeo Aulas
                      </span>
                    )}
                  </div>
                </div>

                {/* Categorias */}
                {selectedProductForModal.categories.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-[12px] dark:text-[#FFFFFF80] text-[#00000080]">
                      Categorias:
                    </span>
                    <div className="flex gap-1 flex-wrap">
                      {selectedProductForModal.categories.map((category) => (
                        <span
                          key={category.id}
                          className="text-[10px] px-[6px] py-[2px] rounded-[8px] dark:bg-[#FFFFFF0D] bg-[#F5F5F5] dark:text-white text-black"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col gap-3">
                <Button
                  disabled={buyProductMutation.isPending}
                  loading={buyProductMutation.isPending}
                  theme="blue"
                  fullWidth
                  onClick={handleAcquireProduct}
                >
                  Adquirir Produto
                </Button>

                <Button theme="secondary" fullWidth onClick={handleCloseModal}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductSelect;
