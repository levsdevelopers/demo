type Props = {
  title: string;
  value: number | string;
  subtitle?: string;
};

export default function MetricCard({ title, value, subtitle }: Props) {
  return (
    <div className=" dark:bg-gray-800  dark:text-white dark:border-gray-700 border bg-white rounded p-4 shadow w-48">
      <div className="dark:text-white text-sm text-slate-500">{title}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        {subtitle && (
          <div className="dark:text-white text-sm text-slate-400">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
