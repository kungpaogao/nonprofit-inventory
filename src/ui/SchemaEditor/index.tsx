import { useState, useEffect } from "react";
import * as crypto from "crypto";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { inc } from "semver";

import { db } from "../../network/firebase";
import CreateField from "./CreateField";
import EditorResults from "./EditorResults";
import { Schema } from "../../models/schema";

export default function SchemaEditor() {
  const [schema, setSchema] = useState<Schema>({
    version: "",
    schema: [],
  });
  // model is the schema that you are editing
  const [model, setModel] = useState("");
  const [isCommittingChanges, setIsCommittingChanges] = useState(false);

  // TODO: set schema based on URL param
  // useEffect(() => {});

  async function refreshSchema(model: string) {
    const latestSchema = await db.doc(`schemas/${model}/schemas/latest`).get();
    if (latestSchema.exists || latestSchema.data()) {
      setSchema(latestSchema.data() as Schema);
    }
  }

  async function handleSelectModelChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const selectedModel = event.target.value;

    if (selectedModel === "new") {
      // TODO: handle creating new schema
      setSchema({ version: "0.1.0", schema: [] });
    } else {
      refreshSchema(selectedModel);
    }
    setModel(event.target.value);
  }

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

    setSchema((prevSchema) => ({
      ...prevSchema,
      schema: [
        ...prevSchema.schema,
        { id, name, type, ...(options && { options }) },
      ],
    }));
  }

  async function commitChanges(model: string) {
    // TODO: some diffing to check if schema actually changed - don't want to update versions unnecessarily

    // get latest schema and verify it exists
    const latestSchema = await db.doc(`schemas/${model}/schemas/latest`).get();
    if (!latestSchema.exists || !latestSchema.data()) {
      console.error("Latest schema not found.");
      return;
    }

    // get latest schema version, generate next schema version
    const latestVersion = schema.version;
    // TODO: make this update major/minor/patch based on what changed
    const nextVersion = inc(latestVersion, "minor");

    // write new document for latest schema version
    await db
      .doc(`schemas/${model}/schemas/${latestVersion}`)
      .set(latestSchema.data()!);

    // write new document for new schema
    setIsCommittingChanges(true);
    const nextSchema = { ...schema, version: nextVersion };
    await db.doc(`schemas/${model}/schemas/latest`).set(nextSchema);
    await refreshSchema(model);
    setIsCommittingChanges(false);
  }

  return (
    <div className="p-4 mt-8 md:w-3/4 mx-auto">
      <div className="mb-12 md:w-1/2">
        <TextField
          select
          variant="outlined"
          label="Schema"
          fullWidth
          value={model}
          onChange={handleSelectModelChange}
        >
          <MenuItem value="" disabled>
            Select a model
          </MenuItem>
          <MenuItem value="furniture">Furniture</MenuItem>
          <MenuItem value="new">New model</MenuItem>
        </TextField>
      </div>
      <div className="mb-12 md:w-1/2">
        <CreateField onSubmit={addField} />
      </div>
      <div className="mb-12">
        <EditorResults schema={schema} setSchema={setSchema} />
      </div>
      <div className="">
        <Button
          variant="contained"
          onClick={() => commitChanges(model)}
          disabled={isCommittingChanges}
          color="primary"
        >
          Commit changes
        </Button>
      </div>
    </div>
  );
}
