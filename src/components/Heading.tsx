import clsx from "clsx";
import React from "react";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        // Base styles. Added 'break-words' to prevent overflow from long, single words.
        "font-bold leading-tight tracking-tight text-slate-300 break-words",

        // FIX: Adjusted font sizes to be responsive.
        // They now have a smaller base size for mobile and a larger size for medium screens and up.
        size === "xl" && "text-5xl md:text-7xl", // Was text-7xl md:text-9xl
        size === "lg" && "text-4xl md:text-6xl", // Was text-6xl md:text-8xl
        size === "md" && "text-3xl md:text-5xl", // Was text-5xl md:text-6xl
        size === "sm" && "text-2xl md:text-4xl", // Was text-3xl md:text-4xl
        
        className, // Allows for additional custom classes
      )}
    >
      {children}
    </Comp>
  );
}
