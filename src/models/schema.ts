export type SchemaField = {
  id: string;
  name: string;
  type: string;
  options?: string;
  chosen?: boolean;
};

export type Schema = {
  version: string;
  schema: SchemaField[];
};
