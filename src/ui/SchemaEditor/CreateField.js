import { MenuItem, TextField, Button, Grid } from "@material-ui/core";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FIELD_TYPES = [
  "text",
  "select",
  "checkbox",
  "radio",
  "number",
  "textarea",
  "email",
  "tel",
  "url",
  "time",
  "datetime",
];

const SCHEMA = yup.object().shape({
  fieldName: yup.string().trim().required(),
  fieldType: yup.mixed().oneOf(FIELD_TYPES).required(),
  fieldOptions: yup.string().when("fieldType", (fieldType) => {
    if (fieldType === "radio" || fieldType === "select")
      return yup
        .string()
        .trim()
        .matches(
          /^[a-z\d.].*[a-z\d.!?)]$/i,
          "Options cannot start or end with special characters except '!' or '.' or '?'"
        )
        .required();
  }),
});

export default function CreateField({ onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SCHEMA) });

  const [fieldType, setFieldType] = useState("");

  const requireOptions = (fieldType) =>
    fieldType === "radio" || fieldType === "select";

  const handleFieldTypeChange = (event) => {
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
                <TextField {...field} label="Field name" className="w-1/2" />
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
                  value={fieldType}
                  onChange={(e) => field.onChange(handleFieldTypeChange(e))}
                >
                  <MenuItem value="" disabled>
                    Select an field type
                  </MenuItem>
                  {FIELD_TYPES.map((type) => (
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
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </>
  );
}
