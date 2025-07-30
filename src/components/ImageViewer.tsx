"use client";

import { Maximize, X } from "lucide-react";
import { useState } from "react";

import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("react-viewer"), { ssr: false });

/* eslint-disable @next/next/no-img-element */
type ImageViewerProps = {
  imageUrl: string;
  altText?: string;
  className?: string;
};

const ImageViewer = ({ imageUrl, altText, className }: ImageViewerProps) => {
  const [isImageMaximized, setIsImageMaximized] = useState<boolean>(false);

  return (
    <div className="relative w-fit">
      <img className={className} src={imageUrl} alt={altText} />
      <div className="absolute top-0 right-0 p-2">
        <div
          onClick={() => setIsImageMaximized(true)}
          className="flex items-center justify-center min-w-[48px] h-[48px] rounded-[20px] dark:bg-[#192031] bg-black border border-[#0000000D] p-[3px] cursor-pointer"
        >
          <Maximize className="text-white" size={16} />
        </div>
      </div>

      <Viewer
        visible={isImageMaximized}
        onClose={() => setIsImageMaximized(false)}
        images={[{ src: imageUrl, alt: altText }]}
        className="react-viewer"
        rotatable={false}
        changeable={false}
      />
    </div>
  );
};

export default ImageViewer;
