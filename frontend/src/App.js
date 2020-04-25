import React from "react";
import Header from "./Header";
import Content from "./Content";
import Login from "./Login";
import Footer from "./Footer";
import Register from "./Register";
import { Helmet } from "react-helmet";
import { isUserAuthenticated } from "./Auth.js";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Survket</title>
      </Helmet>
      <div className="app">
        <Header />
        <div className="content-footer">
          <Content>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/"
                render={() => {
                  if (isUserAuthenticated()) {
                    return <div>Logat</div>;
                  } else {
                    return <Redirect to="/login"></Redirect>;
                  }
                }}
              />
            </Switch>
          </Content>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
