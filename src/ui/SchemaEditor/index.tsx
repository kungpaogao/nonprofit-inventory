import { useState } from "react";
import * as crypto from "crypto";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { db } from "../../network/firebase";

import CreateField from "./CreateField";
import EditorResults from "./EditorResults";
import { inc } from "semver";
import { SchemaField } from "../../models/schema";

export default function SchemaEditor() {
  const [schema, setSchema] = useState<SchemaField[]>([]);

  function addField({
    fieldName: name,
    fieldType: type,
    fieldOptions: options,
  }: {
    fieldName: string;
    fieldType: string;
    fieldOptions: string;
  }) {
    const id = `${name.slice(0, 5)}-${type}-${crypto
      .randomBytes(5)
      .toString("hex")}`;
    console.log(id);
    setSchema((prevSchema) => [...prevSchema, { id, name, type, options }]);
  }

  async function commitChanges() {
    const latestSchema = await db.doc("schemas/furniture/schemas/latest").get();
    if (!latestSchema.exists) {
      console.error("Latest schema not found.");
      return;
    }
    const latestVersion = latestSchema.data()?.version;
    const nextVersion = inc(latestVersion, "minor");

    // schema
  }

  return (
    <div className="p-4 mt-8 md:w-3/4 mx-auto">
      <div className="mb-12 md:w-1/2">
        <TextField select variant="outlined" label="Schema" fullWidth>
          <MenuItem>Furniture</MenuItem>
        </TextField>
      </div>
      <div className="mb-12 md:w-1/2">
        <CreateField onSubmit={addField} />
      </div>
      <div className="mb-12">
        <EditorResults schema={schema} setSchema={setSchema} />
      </div>
      <div className="">
        <Button variant="contained" onClick={commitChanges}>
          Commit changes
        </Button>
      </div>
    </div>
  );
}
