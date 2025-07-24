import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  return (
    <div className="relative w-full h-[40rem] overflow-hidden">
      <PrismicNextImage
        field={slice.primary.image}
        fill
        imgixParams={{
          
        }}
        className="object-contain object-left"
      />
    </div>
  );
};

export default ImageBlock;
