import { lazy } from "react";
import { Archive, Edit, ListAlt, ViewList } from "@material-ui/icons";
import { Route } from "./models/route";

const Inventory = lazy(() => import("./ui/Inventory"));
const SchemaEditor = lazy(() => import("./ui/SchemaEditor"));
const ItemDetail = lazy(() => import("./ui/ItemDetail"));

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
  {
    icon: ListAlt,
    text: "Item Detail",
    path: "/detail",
    component: ItemDetail,
  },
];

export default routes;
