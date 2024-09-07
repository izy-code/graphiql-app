export interface ObjectProps {
  key: string;
  value: string;
}

export interface ObjectWithId extends ObjectProps {
  id: string;
}

export interface TableProps {
  title: string;
  tableInfo: ObjectWithId[];
  onChange: (newData: ObjectWithId[]) => void;
}
