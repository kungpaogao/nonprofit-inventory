import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Toolbar } from "@material-ui/core";
import routes from "./routes";

import SideBar from "./ui/SideBar";
import TopBar from "./ui/TopBar";
import { Suspense } from "react";

function App() {
  return (
    <Router>
      <div className="flex">
        <TopBar className="z-10" />
        <SideBar routes={routes} className="z-0" />
        <main className="ml-60 overflow-y-auto w-full h-screen">
          {/* <Toolbar /> used for spacing */}
          <Toolbar />

          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Redirect from="/" to="/inventory" exact />
              {routes.map(({ path, component, divider }) => {
                const Component = component;
                return (
                  !divider && (
                    <Route key={path} path={path}>
                      <Component />
                    </Route>
                  )
                );
              })}
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
