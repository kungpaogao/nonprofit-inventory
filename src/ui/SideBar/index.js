import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { Archive, ViewList } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const sidebarItems = [
  {
    icon: ViewList,
    text: "Inventory",
    route: "/",
  },
  {
    icon: Archive,
    text: "Archive",
    route: "/archive",
  },
];

export default function SideBar({ className }) {
  const history = useHistory();

  return (
    <Drawer variant="permanent" className={className}>
      <Toolbar />
      <List className="w-60">
        {sidebarItems.map(({ divider, icon, text, route }, index) => {
          if (divider) {
            return <Divider key={`divider${index}`} />;
          } else {
            const Icon = icon;
            return (
              <ListItem button key={route} onClick={() => history.push(route)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
              </ListItem>
            );
          }
        })}
      </List>
    </Drawer>
  );
}
