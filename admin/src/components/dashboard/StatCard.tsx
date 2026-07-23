interface Props {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-900 p-6 shadow">
      <h2 className="text-slate-400">{title}</h2>

      <p className="mt-3 text-4xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}