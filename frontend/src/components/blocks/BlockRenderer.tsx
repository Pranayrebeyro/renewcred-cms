import HeroBlock from "./HeroBlock";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import ButtonBlock from "./ButtonBlock";
import GalleryBlock from "./GalleryBlock";
import { Block } from "@/types/page";

interface Props {
  block: Block;
}

export default function BlockRenderer({ block }: Props) {
  switch (block.type.toLowerCase()) {
    case "hero":
      return <HeroBlock data={block.data} />;

    case "text":
      return <TextBlock data={block.data} />;

    case "image":
      return <ImageBlock data={block.data} />;

    case "button":
      return <ButtonBlock data={block.data} />;

    case "gallery":
      return <GalleryBlock data={block.data} />;

    default:
      return (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
          <strong>Unknown block type:</strong> {block.type}
        </div>
      );
  }
}