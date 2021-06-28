import { DataGrid } from "@material-ui/data-grid";

export default function Inventory() {
  const columns = [
    { field: "class", headerName: "Class", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "zone", headerName: "Zone", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "donor", headerName: "Donor", flex: 1 },
    { field: "dateAdded", headerName: "Date Added", flex: 1 },
  ];

  const rows = [
    {
      id: "r1",
      class: "Chair",
      status: "OnTruck",
      zone: "Ithaca",
      address: "123 Cornell St Ithaca, NY",
      donor: "Andrew",
      dateAdded: "2021-06-28",
    },
    {
      id: "r2",
      class: "Chair",
      status: "OnTruck",
      zone: "Ithaca",
      address: "123 Cornell St Ithaca, NY",
      donor: "Andrew",
      dateAdded: "2021-06-28",
    },
    {
      id: "r3",
      class: "Chair",
      status: "OnTruck",
      zone: "Ithaca",
      address: "123 Cornell St Ithaca, NY",
      donor: "Andrew",
      dateAdded: "2021-06-28",
    },
  ];

  return (
    <div className="flex h-full w-full">
      <div className="flex-grow">
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={20}
          checkboxSelection
        />
      </div>
    </div>
  );
}
