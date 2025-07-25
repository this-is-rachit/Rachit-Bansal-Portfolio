import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { components } from "@/slices";
import Heading from "@/components/Heading";
import { formatDate } from "@/utils/formatDate";

export default function ContentBody({
  page,
}: {
  page: Content.AchievementPageDocument | Content.ProjectDocument;
}) {
  const formattedDate = formatDate(page.data.date);
  return (
    // Using an article tag for semantic HTML.
    // Padding is responsive for different screen sizes.
    <article className="px-4 py-10 md:px-6 md:py-14 lg:py-16">
      {/* This div centers the content and sets a max-width, a common practice for responsive layouts. */}
      <div className="mx-auto w-full max-w-7xl">
        {/* The main content card with responsive padding. */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
          <Heading as="h1">{page.data.title}</Heading>

          {/* FIX: Added 'flex-wrap' to this container.
            This is the key change to prevent overflow on mobile. 
            'flex-wrap' allows the tags to move to the next line if there isn't enough horizontal space.
            Also added a vertical gap `gap-y-2` for better spacing when tags wrap.
          */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-yellow-400">
            {page.tags.map((tag: string, index: number) => (
              <span key={index} className="text-xl font-bold">
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
            {formattedDate}
          </p>

          {/* The 'prose' classes from Tailwind's typography plugin are excellent for styling blocks of text
            and ensuring content like paragraphs and lists wrap correctly.
            'max-w-none' removes the default max-width from prose, allowing it to fill its parent.
          */}
          <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </div>
    </article>
  );
}
