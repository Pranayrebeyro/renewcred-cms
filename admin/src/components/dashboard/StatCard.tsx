interface Props {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg transition duration-300 hover:border-blue-500 hover:shadow-xl">
      <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <h2 className="mt-5 text-5xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}