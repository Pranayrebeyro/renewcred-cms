interface TextData {
  heading?: string;
  content?: string;
}

interface TextBlockProps {
  data: TextData;
}

export default function TextBlock({ data }: TextBlockProps) {
  return (
    <section className="rounded-xl bg-white p-8 shadow">
      <h2 className="mb-4 text-3xl font-bold">
        {data.heading}
      </h2>

      <p className="whitespace-pre-line leading-8 text-gray-700">
        {data.content}
      </p>
    </section>
  );
}