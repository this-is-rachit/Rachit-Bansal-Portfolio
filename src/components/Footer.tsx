import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
// import Bounded from "@/components/Bounded"; // Removed this line
import { isFilled } from "@prismicio/client";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa6";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    // Replaced <Bounded as="footer" ...> with <footer className="...">
    // and applied Bounded's internal max-width and margin styles directly
    <footer className={clsx("text-slate-600 px-4 py-10 md:px-6 md:py-14 lg:py-16")}>
      <div className="mx-auto w-full max-w-7xl"> {/* Bounded's inner div */}
        <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
          <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-yellow-400"
            >
              {settings.data.name}
            </Link>
            <span
              className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
              aria-hidden={true}
            >
              /
            </span>
            <p className=" text-sm text-slate-300 ">
              © {new Date().getFullYear()} {settings.data.name}
            </p>
          </div>
          <nav className="navigation" aria-label="Footer Navigation">
            <ul className="flex items-center gap-1">
              {settings.data.nav_item.map(({ link, label }, index) => (
                <React.Fragment key={label}>
                  <li>
                    <PrismicNextLink
                      className={clsx(
                        "group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-yellow-400",
                      )}
                      field={link}
                    >
                      {label}
                    </PrismicNextLink>
                  </li>
                  {index < settings.data.nav_item.length - 1 && (
                    <span
                      className="text-4xl font-thin leading-[0] text-slate-400"
                      aria-hidden="true"
                    >
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>
          <div className="socials inline-flex justify-center sm:justify-end">
            {isFilled.link(settings.data.github_link) && (
              <PrismicNextLink
                field={settings.data.github_link}
                className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={settings.data.name + " on GitHub"}
              >
                <FaGithub />
              </PrismicNextLink>
            )}
            {isFilled.link(settings.data.email_link) && (
              <PrismicNextLink
                field={settings.data.email_link}
                className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={settings.data.name + " on Email"}
              >
                <FaEnvelope/>
              </PrismicNextLink>
            )}
            {isFilled.link(settings.data.linkedin_link) && (
              <PrismicNextLink
                field={settings.data.linkedin_link}
                className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={settings.data.name + " on LinkedIn"}
              >
                <FaLinkedin />
              </PrismicNextLink>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}