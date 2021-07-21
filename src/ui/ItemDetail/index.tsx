import { useState } from "react";
import {
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Grid,
  TextFieldProps,
} from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { Schema, SchemaFieldType } from "../../models/schema";
import { db } from "../../network/firebase";
import states from "../../data/states.json";

function ReadOnlyTextField({
  label,
  readOnly,
  value,
  ...props
}: {
  readOnly?: boolean;
} & TextFieldProps) {
  return (
    <TextField
      InputProps={{ readOnly, disableUnderline: readOnly }}
      InputLabelProps={{
        shrink: !readOnly || (readOnly && !!value),
      }}
      label={label}
      value={value}
      fullWidth
      {...props}
    />
  );
}

export default function ItemDetail({
  model = "furniture",
  version = "latest",
  readOnly = true,
}: {
  model: string;
  version: string;
  readOnly: boolean;
}) {
  const [itemState, setItemState] = useState<any>({
    "first-text-88e84ae5c7": "hello",
  });
  const [schema, loading, error] = useDocumentDataOnce<Schema>(
    db.doc(`schemas/${model}/schemas/${version}`)
  );

  if (error) {
    return <p>Invalid schema.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(schema);

  return (
    <>
      <h2 className="text-2xl mb-4">{model}</h2>
      <Grid container spacing={3}>
        {schema?.schema
          .map(({ id, name, type, options }) => {
            switch (type) {
              case SchemaFieldType.TEXT:
                return (
                  <ReadOnlyTextField
                    readOnly={readOnly}
                    key={id}
                    label={name}
                    value={itemState?.[id]}
                    className="w-1/2"
                  />
                );
              case SchemaFieldType.SELECT:
                return (
                  <ReadOnlyTextField
                    readOnly={readOnly}
                    key={id}
                    label={name}
                    select
                    className="w-1/2"
                    fullWidth
                  >
                    {options?.split(";").map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </ReadOnlyTextField>
                );
              case SchemaFieldType.CHECKBOX:
                return (
                  <FormControlLabel
                    key={id}
                    control={<Checkbox readOnly={readOnly} color="primary" />}
                    label={name}
                  />
                );
              case SchemaFieldType.RADIO:
                return (
                  <FormControl key={id}>
                    <FormLabel>{name}</FormLabel>
                    {/* TODO: figure out how to handle readOnly */}
                    <RadioGroup name={id}>
                      {options?.split(";").map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                );
              case SchemaFieldType.NUMBER:
                return (
                  <ReadOnlyTextField
                    readOnly={readOnly}
                    key={id}
                    label={name}
                    type="number"
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.TEXTAREA:
                return (
                  <ReadOnlyTextField
                    readOnly={readOnly}
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                    multiline
                  />
                );
              case SchemaFieldType.EMAIL:
                // TODO: add validation
                return (
                  <ReadOnlyTextField
                    readOnly={readOnly}
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.TEL:
                // TODO: add validation
                return (
                  <ReadOnlyTextField
                    readOnly={readOnly}
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.URL:
                // TODO: add validation
                return (
                  <ReadOnlyTextField
                    readOnly={readOnly}
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.TIME:
                return (
                  <KeyboardTimePicker
                    readOnly={readOnly}
                    label={name}
                    key={id}
                    value={itemState[id]}
                    onChange={(date) =>
                      setItemState((prevState: any) => ({
                        ...prevState,
                        [id]: date,
                      }))
                    }
                  />
                );
              case SchemaFieldType.DATETIME:
                return (
                  <KeyboardDateTimePicker
                    readOnly={readOnly}
                    label={name}
                    key={id}
                    value={itemState[id]}
                    onChange={(date) =>
                      setItemState((prevState: any) => ({
                        ...prevState,
                        [id]: date,
                      }))
                    }
                  />
                );
              case SchemaFieldType.ADDRESS:
                return (
                  <>
                    <h3>{name}</h3>
                    <Grid container key={id} spacing={3}>
                      <Grid item xs={12}>
                        <ReadOnlyTextField
                          readOnly={readOnly}
                          label="Street address"
                          className="w-1/2"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ReadOnlyTextField
                          readOnly={readOnly}
                          label="City"
                          className="w-1/2"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <ReadOnlyTextField
                          readOnly={readOnly}
                          label="State"
                          className="w-1/2"
                          fullWidth
                          select
                        >
                          {states.map(({ name, abbrev }) => (
                            <MenuItem key={abbrev}>{abbrev}</MenuItem>
                          ))}
                        </ReadOnlyTextField>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <ReadOnlyTextField
                          readOnly={readOnly}
                          label="ZIP"
                          className="w-1/2"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </>
                );
              default:
                return <div key={id}>Invalid schema element.</div>;
            }
          })
          .map((element) => (
            <Grid key={element.key} item xs={12}>
              {element}
            </Grid>
          ))}
      </Grid>
    </>
  );
}
