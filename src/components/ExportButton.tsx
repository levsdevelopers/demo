import { generateCSV, downloadCSV } from "@/utils/csv";
import { useTranslation } from "react-i18next";

interface Row {
  date: string;
  total: number;
  id: string | number;
}

export default function ExportButton<T extends Row>({ rows }: { rows: T[] }) {
  const { t } = useTranslation();

  return (
    <button
      className="px-3 py-1 rounded border"
      onClick={() => {
        const csv = generateCSV(rows);
        downloadCSV("arqa_export.csv", csv);
      }}
    >
      {t("Export CSV")}
    </button>
  );
}
