import { DataGrid } from "@material-ui/data-grid";
import {
  useCollection,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { Schema } from "../../models/schema";
import { db } from "../../network/firebase";

const MODEL = "furniture";

export default function Inventory() {
  const [schema, isSchemaLoading, isSchemaError] = useDocumentDataOnce<Schema>(
    db.doc(`schemas/${MODEL}/schemas/latest`)
  );

  const [data, isDataLoading, isDataError] = useCollection(
    db.collection("data").where("schema", "==", MODEL)
  );

  const columns = schema?.schema.map(({ id, name }) => ({
    field: id,
    headerName: name,
    flex: 1,
  }));

  if (isSchemaError || isDataError) {
    return <div>Error.</div>;
  }

  if (isSchemaLoading || isDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full">
      <div className="flex-grow">
        <DataGrid
          columns={columns!}
          rows={data!.docs.map((doc) => doc.data())}
          pageSize={20}
          checkboxSelection
        />
      </div>
    </div>
  );
}
