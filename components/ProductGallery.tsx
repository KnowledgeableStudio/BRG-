"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const productImageFrameClass =
  "group relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.28)]";

const productImageClass =
  "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110";

const productImageStyle = {
  objectPosition: "center",
  transformOrigin: "center"
} as const;

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <motion.div
        className={productImageFrameClass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Image
          src={selectedImage}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className={productImageClass}
          style={productImageStyle}
        />
      </motion.div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            onClick={() => setSelectedImage(image)}
            className={productImageFrameClass}
            aria-label={`View ${name} angle ${index + 1}`}
            aria-pressed={selectedImage === image}
          >
            <Image
              src={image}
              alt={`${name} angle ${index + 1}`}
              fill
              sizes="120px"
              className={productImageClass}
              style={productImageStyle}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
