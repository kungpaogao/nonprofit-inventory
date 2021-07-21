import { randomBytes, randomInt } from "crypto";
import firebase from "firebase/app";
import "firebase/firestore";
import { Schema, SchemaFieldType } from "../src/models/schema";

// the schema to create data
const MODEL = process.env.MODEL;
// number of items to generate; default 5
const COUNT = process.env.COUNT || 5;

if (!MODEL) {
  throw Error("No model provided.");
}

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyA-9nNrMgYCNdrK9Uuci2MWuHlXhtVGt10",
  authDomain: "nonprofit-inventory.firebaseapp.com",
  projectId: "nonprofit-inventory",
  storageBucket: "nonprofit-inventory.appspot.com",
  messagingSenderId: "431505251556",
  appId: "1:431505251556:web:c80f19ee33ea12dcc9a0f1",
  measurementId: "G-ZVBJMKHQH1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

function generateData(schema: Schema) {
  let data: any = {};
  schema.schema.forEach(({ id, name, type, options }) => {
    let selectedOption;
    switch (type) {
      case SchemaFieldType.ADDRESS:
        data[id] = {};
        data[id].street = `${randomInt(1, 1000)} Main St`;
        data[id].city = "Ithaca";
        data[id].state = "NY";
        data[id].zip = "14850";
        break;
      case SchemaFieldType.CHECKBOX:
        data[id] = !!randomInt(2);
        break;
      case SchemaFieldType.DATETIME:
        data[id] = new Date();
        break;
      case SchemaFieldType.EMAIL:
        data[id] = `${randomBytes(2).toString("hex")}@email.com`;
        break;
      case SchemaFieldType.NUMBER:
        data[id] = randomInt(100);
        break;
      case SchemaFieldType.RADIO:
        selectedOption = options?.[randomInt(options?.length)];
        data[id] = selectedOption;
        break;
      case SchemaFieldType.SELECT:
        selectedOption = options?.[randomInt(options?.length)];
        data[id] = selectedOption;
        break;
      case SchemaFieldType.TEL:
        data[id] = randomInt(1000000000, 9999999999).toString();
        break;
      case SchemaFieldType.TEXT:
        data[id] = `Hello world ${randomBytes(2).toString("hex")}`;
        break;
      case SchemaFieldType.TEXTAREA:
        data[id] = `Hello world\n${randomBytes(2).toString(
          "hex"
        )}\nGoodbye world`;
        break;
      case SchemaFieldType.TIME:
        data[id] = `${randomInt(24)}:${randomInt(60)}:${randomInt(60)}`;
        break;
      case SchemaFieldType.URL:
        data[id] =
          "https://open.spotify.com/playlist/6ia08impkKSv9NocAE1Aiv?si=ab0515be62974237";
        break;
      default:
        throw Error("Unknown schema field type.");
    }
  });

  return data;
}

async function fetchLatestSchema(model: string) {
  const latestSchemaSnap = await db
    .doc(`schemas/${model}/schemas/latest`)
    .get();

  if (!latestSchemaSnap.exists || !latestSchemaSnap.data()) {
    throw Error("Failed to fetch latest schema.");
  }

  return latestSchemaSnap.data();
}

async function main() {
  // fetch latest schema
  const latestSchema = (await fetchLatestSchema(MODEL!)) as Schema;

  // generate random data
  for (let i = 0; i < COUNT; i++) {
    const data = generateData(latestSchema);
    db.collection("data").add({
      schema: MODEL,
      version: latestSchema.version,
      ...data,
    });
  }

  return;
}

main();
