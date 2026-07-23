interface HeroData {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

interface HeroBlockProps {
  data: HeroData;
}

export default function HeroBlock({ data }: HeroBlockProps) {
  return (
    <section
      className="rounded-xl bg-blue-600 px-8 py-24 text-center text-white"
      style={
        data.backgroundImage
          ? {
              backgroundImage: `url(${data.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-5xl font-bold">
          {data.title || "Hero Title"}
        </h1>

        <p className="mb-8 text-xl">
          {data.subtitle || ""}
        </p>

        {data.buttonText && (
          <a
            href={data.buttonLink || "#"}
            className="inline-block rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            {data.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}