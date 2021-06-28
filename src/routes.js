import { lazy } from "react";
import { Archive, Edit, ViewList } from "@material-ui/icons";

const Inventory = lazy(() => import("./ui/Inventory"));
const SchemaEditor = lazy(() => import("./ui/SchemaEditor"));

const routes = [
  {
    icon: ViewList,
    text: "Inventory",
    path: "/inventory",
    component: Inventory,
  },
  {
    icon: Archive,
    text: "Archive",
    path: "/archive",
    component: () => <div>Archive</div>,
  },
  {
    divider: true,
  },
  {
    icon: Edit,
    text: "Schema Editor",
    path: "/editor",
    component: SchemaEditor,
  },
];

export default routes;
