import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

export async function addItem(snap: DocumentSnapshot): Promise<void> {
  const data = snap.data();
  if (data !== undefined) {
    data.id = snap.ref.id;
    data.metadata = {};
    data.metadata.dateAdded = new Date();
    data.metadata.dateModified = new Date();
    await snap.ref.set(data);
  }
}
