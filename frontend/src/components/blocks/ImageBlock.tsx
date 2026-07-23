interface ImageData {
  imageUrl?: string;
  alt?: string;
}

interface ImageBlockProps {
  data: ImageData;
}

export default function ImageBlock({ data }: ImageBlockProps) {
  if (!data.imageUrl) return null;

  return (
    <section className="overflow-hidden rounded-xl shadow">
      <img
        src={data.imageUrl}
        alt={data.alt || "Image"}
        className="w-full object-cover"
      />
    </section>
  );
}