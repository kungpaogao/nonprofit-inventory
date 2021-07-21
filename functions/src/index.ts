import * as functions from "firebase-functions";
import { addItem } from "./item";

exports.addItem = functions.firestore
  .document("data/{id}")
  .onCreate(async (snap) => await addItem(snap));
