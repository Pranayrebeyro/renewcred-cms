interface GalleryBlockProps {
  data: {
    images?: string[];
  };
}

export default function GalleryBlock({ data }: GalleryBlockProps) {
  if (!data.images?.length) return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery ${index + 1}`}
          className="rounded-lg"
        />
      ))}
    </div>
  );
}