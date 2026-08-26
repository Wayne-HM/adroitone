"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/data/images";

type ImageRevealProps = {
  image: SiteImage;
  alt?: string;
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  caption?: React.ReactNode;
  /** Slow Ken Burns drift after reveal (very subtle). */
  drift?: boolean;
};

/**
 * Editorial image reveal — a quiet clip/scale settle.
 * The kind of motion you feel rather than notice.
 */
export function ImageReveal({
  image,
  alt,
  aspect = "aspect-[4/3]",
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  caption,
  drift = false,
}: ImageRevealProps) {
  const reduce = useReducedMotion();

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl bg-ink-800",
        aspect,
        className
      )}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? undefined : { scale: 1.06, opacity: 0.4 }}
        whileInView={reduce ? undefined : { scale: drift ? 1.03 : 1, opacity: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      >
        <Image
          src={image.src}
          alt={alt ?? image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/55 to-transparent px-5 pb-4 pt-14">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
