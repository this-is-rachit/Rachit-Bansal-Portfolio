import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ContentList from "./ContentList";
import Heading from "@/components/Heading";
import clsx from "clsx";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex: FC<ContentIndexProps> = async ({ slice }) => {
  const client = createClient();
  const achievementPosts = await client.getAllByType("achievement_page");
  const projects = await client.getAllByType("project");

  const items = slice.primary.content_type === "Achievements" ? achievementPosts : projects;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // REDUCED VERTICAL PADDING HERE
      className={clsx("px-4 py-5 md:px-6 md:py-7 lg:py-8")}
    >
      <div className="mx-auto w-full max-w-7xl">
        <Heading size="xl" className="mb-8">
          {slice.primary.heading}
        </Heading>
        {isFilled.richText(slice.primary.description) && (
          <div className="prose prose-xl prose-invert mb-10">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
        <ContentList
          items={items}
          contentType={slice.primary.content_type}
          viewMoreText={slice.primary.view_more_text}
          fallbackItemImage={slice.primary.fallback_item_image}
        />
      </div>
    </section>
  );
};

export default ContentIndex;