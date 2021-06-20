import { ReactSortable } from "react-sortablejs";

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

function SchemaElement({ id, type, options, chosen }) {
  return (
    <div className="border border-gray-300 rounded flex p-4 mb-4">
      <div className="handle mr-4 cursor-move">::</div>
      <div className="flex-1">
        <h2 className="text-lg">{id}</h2>
        <p>
          <b>
            {type}
            {options && ":"}
          </b>{" "}
          {options && options.split(";").join(", ")}
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
