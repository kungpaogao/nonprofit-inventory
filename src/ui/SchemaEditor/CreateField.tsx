import { MenuItem, TextField, Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SchemaFieldValidation,
  SchemaFieldTypeValues,
  SchemaFieldType,
} from "../../models/schema";

export default function CreateField({
  onSubmit,
}: {
  onSubmit: ({
    fieldName,
    fieldType,
    fieldOptions,
  }: {
    fieldName: string;
    fieldType: SchemaFieldType;
    fieldOptions: string;
  }) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SchemaFieldValidation) });

  const [fieldType, setFieldType] = useState("");

  const requireOptions = (fieldType: string) =>
    fieldType === "radio" || fieldType === "select";

  const handleFieldTypeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFieldType(event.target.value);
    return event.target.value;
  };

  return (
    <>
      <h2 className="text-2xl mb-4">Add field</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="fieldName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Field name"
                  className="w-1/2"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="fieldType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-1/2"
                  label="Field type"
                  select
                  fullWidth
                  value={fieldType}
                  onChange={(e) => field.onChange(handleFieldTypeChange(e))}
                >
                  <MenuItem value="" disabled>
                    Select an field type
                  </MenuItem>
                  {SchemaFieldTypeValues.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {requireOptions(fieldType) && (
            <Grid item xs={12}>
              <Controller
                name="fieldOptions"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="w-1/2"
                    label="Field options"
                    placeholder="Enter options separate by ;"
                    fullWidth
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add field
            </Button>
          </Grid>
        </Grid>
      </form>
      {Object.keys(errors).length > 0 && (
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      )}
    </>
  );
}
