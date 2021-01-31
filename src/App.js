import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Switch } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./utils/Common";
import axios from 'axios';
import FetcherMQTT from "./components/FetcherMQTT";
import AssetImages from "./utils/AssetImages"
function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:5000/api/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        alert(error);
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}

        <PrivateRoute path="/dashboard" component={FetcherMQTT} />
        <PublicRoute path="/" component={Login} />
      </Switch>
    </Router>
  );
}
export default App;
