import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Toolbar } from "@material-ui/core";
import firebase from "firebase/app";

import routes from "./routes";

import SideBar from "./ui/SideBar";
import TopBar from "./ui/TopBar";

const firebaseConfig = {
  apiKey: "AIzaSyA-9nNrMgYCNdrK9Uuci2MWuHlXhtVGt10",
  authDomain: "nonprofit-inventory.firebaseapp.com",
  projectId: "nonprofit-inventory",
  storageBucket: "nonprofit-inventory.appspot.com",
  messagingSenderId: "431505251556",
  appId: "1:431505251556:web:c80f19ee33ea12dcc9a0f1",
  measurementId: "G-ZVBJMKHQH1",
};

firebase.initializeApp(firebaseConfig);

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
