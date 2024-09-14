export interface TableRow {
  id: string;
  key: string;
  value: string;
}

export interface TableProps {
  title: string;
  tableInfo: TableRow[];
  onChange: (newData: TableRow[]) => void;
}
