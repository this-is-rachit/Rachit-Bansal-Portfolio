"use client";

import React, { useRef, useState, useEffect } from "react";
import { asImageSrc, isFilled } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import { Content } from "@prismicio/client";
import Link from "next/link"; // Import the Next.js Link component

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
    items: Content.AchievementPageDocument[] | Content.ProjectDocument[];
    contentType: Content.ContentIndexSlice["primary"]["content_type"];
    fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
    viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

export default function ContentList({
    items,
    contentType,
    fallbackItemImage,
    viewMoreText = "Read More",
}: ContentListProps) {
    const component = useRef(null);
    const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
    const revealRef = useRef(null);
    const [currentItem, setCurrentItem] = useState<null | number>(null);
    const [hovering, setHovering] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const urlPrefix = contentType === "Achievements" ? "/achievements" : "/projects";

    useEffect(() => {
        // Animate list-items in with a stagger
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item) => {
                gsap.fromTo(
                    item,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.3,
                        ease: "elastic.out(1,0.3)",
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom-=100px",
                            end: "bottom center",
                            toggleActions: "play none none none",
                        },
                    },
                );
            });

            return () => ctx.revert(); // cleanup!
        }, component);
    }, []);

    useEffect(() => {
        // Mouse move event listener for the hover effect
        const handleMouseMove = (e: MouseEvent) => {
            const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
            const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

            const ctx = gsap.context(() => {
                // Animate the image holder
                if (currentItem !== null) {
                    const maxY = window.scrollY + window.innerHeight - 350;
                    const maxX = window.innerWidth - 250;

                    gsap.to(revealRef.current, {
                        x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
                        y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
                        rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
                        ease: "back.out(2)",
                        duration: 1.3,
                    });
                    gsap.to(revealRef.current, {
                        opacity: hovering ? 1 : 0,
                        visibility: "visible",
                        ease: "power3.out",
                        duration: 0.4,
                    });
                }
                lastMousePos.current = mousePos;
                return () => ctx.revert(); // cleanup!
            }, component);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hovering, currentItem]);

    const onMouseEnter = (index: number) => {
        setCurrentItem(index);
        if (!hovering) setHovering(true);
    };

    const onMouseLeave = () => {
        setHovering(false);
        setCurrentItem(null);
    };

    const contentImages = items.map((item) => {
        const image = isFilled.image(item.data.hover_image)
            ? item.data.hover_image
            : fallbackItemImage;
        return asImageSrc(image, {
            fit: "crop",
            w: 220,
            h: 320,
            exp: -10,
        });
    });

    // Preload images for the hover effect
    useEffect(() => {
        contentImages.forEach((url) => {
            if (!url) return;
            const img = new Image();
            img.src = url;
        });
    }, [contentImages]);

    return (
        <>
            <ul
                ref={component}
                className="grid border-b border-b-slate-100"
                onMouseLeave={onMouseLeave}
            >
                {items.map((item, index) => (
                    <li
                        key={item.id} // Using item.id for a more stable key
                        ref={(el) => {
                            itemsRef.current[index] = el;
                        }}
                        onMouseEnter={() => onMouseEnter(index)}
                        className="list-item opacity-0"
                    >
                        <Link
                            href={`${urlPrefix}/${item.uid}`}
                            className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
                            aria-label={item.data.title || ""}
                        >
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">{item.data.title}</span>
                                <div className="flex flex-wrap gap-3 text-yellow-400">
                                    {item.tags.map((tag, index) => (
                                        <span key={index} className="text-lg font-bold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                                {viewMoreText} <MdArrowOutward />
                            </span>
                        </Link>
                    </li>
                ))}

                {/* Hover element */}
                <div
                    className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
                    style={{
                        backgroundImage:
                            currentItem !== null ? `url(${contentImages[currentItem]})` : "",
                    }}
                    ref={revealRef}
                ></div>
            </ul>
        </>
    );
}
