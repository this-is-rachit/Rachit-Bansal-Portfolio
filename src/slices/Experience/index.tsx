import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";
import clsx from "clsx";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience: FC<ExperienceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // REDUCED VERTICAL PADDING HERE
      className={clsx("px-4 py-5 md:px-6 md:py-7 lg:py-8")}
    >
      <div className="mx-auto w-full max-w-7xl">
        <Heading as="h2" size="lg">
          {slice.primary.heading}
        </Heading>
        {slice.primary.Items.map(({title, time_period, institution, description}, index) => (
          <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
            <Heading as="h3" size="sm">
              {title}
            </Heading>

            <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
              <span>{time_period}</span>{" "}
              <span className="text-3xl font-extralight">/</span>{" "}
              <span>{institution}</span>
            </div>
            <div className="prose prose-lg prose-invert mt-4">
              <PrismicRichText field={description} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;