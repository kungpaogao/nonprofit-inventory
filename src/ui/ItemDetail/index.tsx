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
} from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { Schema, SchemaFieldType } from "../../models/schema";
import { db } from "../../network/firebase";
import states from "../../data/states.json";

export default function ItemDetail({
  model = "furniture",
  version = "latest",
  readOnly = true,
}: {
  model: string;
  version: string;
  readOnly: boolean;
}) {
  const [itemState, setItemState] = useState<any>({});
  const [schema, loading, error] = useDocumentDataOnce<Schema>(
    db.doc(`schemas/${model}/schemas/${version}`)
  );

  if (error) {
    return <p>Invalid schema.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
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
                    InputProps={{ readOnly, disableUnderline: readOnly }}
                    value="hello"
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.SELECT:
                return (
                  <TextField
                    InputProps={{ readOnly, disableUnderline: readOnly }}
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
                  <TextField
                    InputProps={{ readOnly, disableUnderline: readOnly }}
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
                    InputProps={{ readOnly, disableUnderline: readOnly }}
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
                  <TextField
                    InputProps={{ readOnly, disableUnderline: readOnly }}
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.TEL:
                // TODO: add validation
                return (
                  <TextField
                    InputProps={{ readOnly, disableUnderline: readOnly }}
                    key={id}
                    label={name}
                    className="w-1/2"
                    fullWidth
                  />
                );
              case SchemaFieldType.URL:
                // TODO: add validation
                return (
                  <TextField
                    InputProps={{ readOnly, disableUnderline: readOnly }}
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
                        <TextField
                          InputProps={{ readOnly, disableUnderline: readOnly }}
                          label="Street address"
                          className="w-1/2"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputProps={{ readOnly, disableUnderline: readOnly }}
                          label="City"
                          className="w-1/2"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          InputProps={{ readOnly, disableUnderline: readOnly }}
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
                        <TextField
                          InputProps={{ readOnly, disableUnderline: readOnly }}
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
