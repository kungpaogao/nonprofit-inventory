import * as yup from "yup";

export type Schema = {
  version: string;
  schema: SchemaField[];
};

export type SchemaField = {
  id: string;
  name: string;
  type: SchemaFieldType;
  options?: string;
  chosen?: boolean;
};

export enum SchemaFieldType {
  TEXT = "text",
  SELECT = "select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  NUMBER = "number",
  TEXTAREA = "textarea",
  EMAIL = "email",
  TEL = "tel",
  URL = "url",
  TIME = "time",
  DATETIME = "datetime",
  ADDRESS = "address",
}

export const SchemaFieldTypeValues = Object.values(SchemaFieldType);

export const SchemaFieldValidation = yup.object().shape({
  fieldName: yup.string().trim().required(),
  fieldType: yup.mixed().oneOf(SchemaFieldTypeValues).required(),
  fieldOptions: yup.string().when("fieldType", {
    is: (fieldType: string) => fieldType === "radio" || fieldType === "select",
    then: yup
      .string()
      .trim()
      .matches(
        /^[a-z\d.].*[a-z\d.!?)]$/i,
        "Options cannot start or end with special characters except '!' or '.' or '?'"
      )
      .required(),
  }),
});
