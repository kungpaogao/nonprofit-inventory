import { useState, useEffect } from "react";
import {
  MenuItem,
  TextField,
  InputBase,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Grid,
} from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";

import { Schema, SchemaFieldType } from "../../models/schema";
import { db } from "../../network/firebase";
import states from "../../data/states.json";

export default function ItemDetail({
  model = "furniture",
  version = "latest",
}: {
  model: string;
  version: string;
}) {
  const [schema, setSchema] = useState<Schema>();
  const [itemState, setItemState] = useState<any>({});

  useEffect(() => {
    async function fetchSchema(model: string, version: string) {
      const versionSchema = await db
        .doc(`schemas/${model}/schemas/${version}`)
        .get();
      if (versionSchema.exists || versionSchema.data()) {
        // fetched valid schema
        setSchema(versionSchema.data() as Schema);
      }
    }
    fetchSchema(model, version);
  }, [model, version, setSchema]);

  if (!schema) {
    return <p>Invalid schema.</p>;
  }

  return (
    <>
      <h2 className="text-2xl mb-4">{model}</h2>
      <Grid container spacing={3}>
        {schema?.schema
          .map(({ id, name, type, options }) => {
            switch (type) {
              case SchemaFieldType.TEXT:
                return (
                  <TextField
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.SELECT:
                return (
                  <TextField
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
                  </TextField>
                );
              case SchemaFieldType.CHECKBOX:
                return (
                  <FormControlLabel
                    key={id}
                    control={<Checkbox color="primary" />}
                    label={name}
                  />
                );
              case SchemaFieldType.RADIO:
                return (
                  <FormControl key={id}>
                    <FormLabel>{name}</FormLabel>
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
                  <TextField
                    key={id}
                    label={name}
                    type="number"
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.TEXTAREA:
                return (
                  <TextField
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                    multiline
                  />
                );
              case SchemaFieldType.EMAIL:
                return (
                  <TextField
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.TEL:
                return (
                  <TextField
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.URL:
                return (
                  <TextField
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.TIME:
                return (
                  <KeyboardTimePicker
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
                        <TextField
                          label="Street address"
                          className="w-1/2"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField label="City" className="w-1/2" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="State"
                          className="w-1/2"
                          fullWidth
                          select
                        >
                          {states.map(({ name, abbrev }) => (
                            <MenuItem key={abbrev}>{abbrev}</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField label="ZIP" className="w-1/2" fullWidth />
                      </Grid>
                    </Grid>
                  </>
                );
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
