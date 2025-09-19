import { useState } from "react";

type Period = "7d" | "30d" | "qtd" | "ytd" | "custom";
type Channel = "Web" | "Mobile" | "Offline";
type City = "Алматы" | "Астана";

type Filters = {
  period: Period;
  channel?: Channel;
  city?: City;
};

type Props = {
  onApply: (filters: Filters) => void;
};

export default function FiltersSheet({ onApply }: Props) {
  const [period, setPeriod] = useState<Period>("7d");
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const [city, setCity] = useState<City | undefined>(undefined);

  return (
    <div className="xs: flex-col flex items-center gap-2">
      <div className="xs: flex-col md:flex-row flex gap-2">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className=" dark:bg-gray-800  dark:text-white border p-1 rounded"
        >
          <option value="7d">7d</option>
          <option value="30d">30d</option>
          <option value="qtd">QTD</option>
          <option value="ytd">YTD</option>
          <option value="custom">Custom</option>
        </select>

        <select
          value={channel}
          onChange={(e) =>
            setChannel(e.target.value ? (e.target.value as Channel) : undefined)
          }
          className="dark:bg-gray-800  dark:text-white border p-1 rounded"
        >
          <option value="">All channels</option>
          <option value="Web">Web</option>
          <option value="Mobile">Mobile</option>
          <option value="Offline">Offline</option>
        </select>

        <select
          value={city}
          onChange={(e) =>
            setCity(e.target.value ? (e.target.value as City) : undefined)
          }
          className="dark:bg-gray-800  dark:text-white border p-1 rounded"
        >
          <option value="">All cities</option>
          <option value="Алматы">Алматы</option>
          <option value="Астана">Астана</option>
        </select>

        <button
          onClick={() => onApply({ period, channel, city })}
          className="dark:bg-gray-800  dark:text-white px-3 py-1 border rounded bg-slate-800 text-white"
        >
          Применить
        </button>
      </div>
    </div>
  );
}
