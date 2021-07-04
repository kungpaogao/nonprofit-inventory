import { AppBar, Toolbar } from "@material-ui/core";

export default function TopBar({ className }: { className: string }) {
  return (
    <AppBar position="fixed" className={className}>
      <Toolbar>
        <h1>Inventory</h1>
      </Toolbar>
    </AppBar>
  );
}
