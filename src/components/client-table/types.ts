export interface IData {
  key: string;
  value: string;
}

export interface ITableProps {
  title: string;
  tableInfo: IData[];
  onChange: (newData: IData[]) => void;
}
