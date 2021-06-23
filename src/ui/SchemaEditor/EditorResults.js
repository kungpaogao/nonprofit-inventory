import { ReactSortable } from "react-sortablejs";
import { Button, Card } from "@material-ui/core";
import { DragIndicator } from "@material-ui/icons";

export default function EditorResults({ schema, setSchema }) {
  return (
    <>
      <h2 className="text-2xl mb-4">Results</h2>
      <ReactSortable
        handle=".handle"
        animation={150}
        list={schema}
        setList={setSchema}
      >
        {schema.map(({ id, type, options, chosen }, index) => (
          <SchemaElement
            key={id + index}
            id={id}
            type={type}
            options={options}
            chosen={chosen}
          />
        ))}
      </ReactSortable>
      <pre>{JSON.stringify(schema, null, 2)}</pre>
    </>
  );
}

function SchemaElement({ id, type, options }) {
  return (
    <Card className="flex p-4 mb-4">
      <div className="handle mr-4 cursor-move flex flex-col justify-center">
        <DragIndicator />
      </div>
      <div className="flex-1 mr-4">
        <h2 className="text-lg">{id}</h2>
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
