import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

export default function SideBar({ routes, className }) {
  const history = useHistory();
  const location = useLocation();

  return (
    <Drawer variant="permanent" className={className}>
      <Toolbar />
      <List className="w-60">
        {routes?.map(({ divider, icon, text, path }, index) => {
          if (divider) {
            return <Divider key={`divider${index}`} />;
          } else {
            const Icon = icon;
            return (
              <ListItem
                button
                selected={location.pathname === path}
                key={path}
                onClick={() => history.push(path)}
              >
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
