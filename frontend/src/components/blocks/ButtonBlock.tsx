interface ButtonBlockProps {
  data: {
    text?: string;
    link?: string;
  };
}

export default function ButtonBlock({ data }: ButtonBlockProps) {
  return (
    <a
      href={data.link || "#"}
      className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
    >
      {data.text}
    </a>
  );
}