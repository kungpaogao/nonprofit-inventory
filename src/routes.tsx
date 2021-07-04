import { lazy } from "react";
import { Archive, Edit, ViewList } from "@material-ui/icons";
import { Route } from "./models/route";

const Inventory = lazy(() => import("./ui/Inventory"));
const SchemaEditor = lazy(() => import("./ui/SchemaEditor"));

const routes: Route[] = [
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
    component: lazy(() =>
      Promise.resolve({ default: () => <div>Archive</div> })
    ),
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
