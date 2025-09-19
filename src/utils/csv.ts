import Papa from "papaparse";

interface Row {
  date: string;
  total: number;
  id: string | number;
}

export function generateCSV(rows: Row[]) {
  const data = rows.map((r) => ({ date: r.date, revenue: r.total, id: r.id }));
  return Papa.unparse(data);
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
