import { ReactSortable } from "react-sortablejs";
import { Button, Card } from "@material-ui/core";
import { DragIndicator } from "@material-ui/icons";
import { SchemaField } from "../../models/schema";

export default function EditorResults({
  schema,
  setSchema,
  debug,
}: {
  schema: SchemaField[];
  setSchema: React.Dispatch<React.SetStateAction<SchemaField[]>>;
  debug?: boolean;
}) {
  return (
    <>
      <h2 className="text-2xl mb-4">Layout</h2>
      <p className="pb-4">
        {schema.length === 0
          ? "Start by adding fields with the Field Creator."
          : "The ordering of fields reflects that of the final form."}
      </p>
      <ReactSortable
        handle=".handle"
        animation={150}
        list={schema}
        setList={setSchema}
      >
        {schema.map(({ id, name, type, options, chosen }) => (
          <SchemaElement key={id} name={name} type={type} options={options} />
        ))}
      </ReactSortable>
      {debug && <pre>{JSON.stringify(schema, null, 2)}</pre>}
    </>
  );
}

function SchemaElement({
  name,
  type,
  options,
}: {
  name: string;
  type: string;
  options: string;
}) {
  return (
    <Card className="flex p-4 mb-4">
      <div className="handle mr-4 cursor-move flex flex-col justify-center">
        <DragIndicator />
      </div>
      <div className="flex-1 mr-4">
        <h2 className="text-lg">{name}</h2>
        <p>
          {type}
          {options && ": "}
          {options && options.split(";").join(", ")}
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </div>
    </Card>
  );
}
