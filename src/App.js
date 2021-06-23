import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toolbar } from "@material-ui/core";

import SchemaEditor from "./ui/SchemaEditor";
import SideBar from "./ui/SideBar";
import TopBar from "./ui/TopBar";

function App() {
  return (
    <Router>
      <div className="flex">
        <TopBar className="z-10" />
        <SideBar className="z-0" />
        <main className="ml-60 overflow-y-auto w-full h-full">
          <Toolbar />
          <Switch>
            <Route>
              <SchemaEditor />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
