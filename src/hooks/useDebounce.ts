import { useEffect, useState } from "react";

/**
 * Hook que retorna um valor com delay (debounced)
 * Útil para evitar muitas chamadas de API durante a digitação
 *
 * @param value - O valor a ser "debounced"
 * @param delay - Delay em milissegundos (padrão: 500ms)
 * @returns O valor com delay aplicado
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o timeout se value mudar antes do delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
