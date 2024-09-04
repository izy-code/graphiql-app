export interface IData {
  key: string;
  value: string;
}

export interface IDataWithId extends IData {
  id: string;
}

export interface ITableProps {
  title: string;
  tableInfo: IDataWithId[];
  onChange: (newData: IDataWithId[]) => void;
}
