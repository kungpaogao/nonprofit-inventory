import { useState } from "react";
import CreateField from "./CreateField";
import EditorResults from "./EditorResults";

export default function SchemaEditor() {
  const [schema, setSchema] = useState([]);

  function addField({ fieldName: id, fieldType: type, fieldOptions: options }) {
    setSchema((prevSchema) => [...prevSchema, { id, type, options }]);
  }

  return (
    <div className="flex p-4">
      <div>
        <CreateField onSubmit={addField} />
      </div>
      <div>
        <EditorResults schema={schema} setSchema={setSchema} />
      </div>
    </div>
  );
}
