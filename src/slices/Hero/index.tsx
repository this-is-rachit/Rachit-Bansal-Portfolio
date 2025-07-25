"use client";

import { useEffect, useRef } from "react";
import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import clsx from "clsx"; // ADDED for shared classes

// 👇 Dynamically import Shapes to prevent hydration mismatch
const Shapes = dynamic(() => import("@/slices/Hero/Shapes").then(mod => mod.Shapes), {
  ssr: false,
});

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const component = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.5,
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );
      t1.fromTo(
        ".job-title",
        { opacity: 0, y: 20, scale: 1.2 },
        { opacity: 1, y: 0, duration: 1, ease: "elastic.out(1,0.3)", scale: 1 },
        "-=0.3"
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (TextField: any, type: string) => {
    const text = typeof TextField === "string" ? TextField : asText(TextField) || "";
    return text.split("").map((letter, index) => (
      <span
        key={`${type}-${index}`}
        className={`name-animation name-animation-${type}-${index} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // REDUCED VERTICAL PADDING HERE
      className={clsx("px-4 py-5 md:px-6 md:py-7 lg:py-8")}
      ref={component}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
          <Shapes />
          <div className="col-start-1 md:row-start-1" data-speed=".2">
            <h1
              className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
              aria-label={`${slice.primary.first_name} ${slice.primary.last_name}`}
            >
              <span className="block text-slate-300">
                {renderLetters(slice.primary.first_name, "first")}
              </span>
              <span className="-mt-[.2em] block text-slate-500">
                {renderLetters(slice.primary.last_name, "last")}
              </span>
            </h1>
            <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
              {typeof slice.primary.tag_line === "string"
                ? slice.primary.tag_line
                : asText(slice.primary.tag_line)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;