import { FC } from "react";
import { Content } from "@prismicio/client";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";
import clsx from "clsx";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // REDUCED VERTICAL PADDING HERE
      className={clsx("px-4 py-5 md:px-6 md:py-7 lg:py-8")}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
          <Heading size="xl" className="col-start-1">
            {slice.primary.heading}
          </Heading>

          <div className="prose prose-xl prose-slate prose-invert col-start-1">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <Button
            linkField={slice.primary.button_link}
            label={slice.primary.button_text}
          />
          <Avatar
            image={slice.primary.avatar}
            className="row-start-1 max-w-sm md:col-start-2 md:row-end-3 scale-90"
          />
        </div>
      </div>
    </section>
  );
};

export default Biography;