import React from "react";
import Header from "./Header";
import Content from "./Content";
import Login from "./Login";
import Footer from "./Footer";
import Register from "./Register";
import Home from "./Home";
import SurveySolve from "./SurveySolve";
import SurveyStats from "./SurveyStats";
import { Helmet } from "react-helmet";
import { isUserAuthenticated, getUserRole } from "./Auth.js";
import Contact from "./Contact";
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
              <Route
                exact
                path="/register"
                render={() => {
                  if (!isUserAuthenticated(localStorage.getItem("token"))) {
                    return <Register />;
                  } else {
                    return <Redirect to="/"></Redirect>;
                  }
                }}
              />
              <Route
                exact
                path="/login"
                render={() => {
                  if (!isUserAuthenticated(localStorage.getItem("token"))) {
                    return <Login />;
                  } else {
                    return <Redirect to="/"></Redirect>;
                  }
                }}
              />
              <Route
                exact
                path="/solve/:id"
                render={(props) => {
                  if (isUserAuthenticated(localStorage.getItem("token"))) {
                    if (getUserRole(localStorage.getItem("token")) === "user_solver") {
                      return <SurveySolve {...props} />;
                    } else {
                      return <Redirect to="/"></Redirect>;
                    }
                  } else {
                    return <Redirect to="/login"></Redirect>;
                  }
                }}
              />
              <Route
                exact
                path="/stats/:id"
                render={(props) => {
                  if (isUserAuthenticated(localStorage.getItem("token"))) {
                    if (getUserRole(localStorage.getItem("token")) === "user_creator") {
                      return <SurveyStats {...props} />;
                    } else {
                      return <Redirect to="/"></Redirect>;
                    }
                  } else {
                    return <Redirect to="/login"></Redirect>;
                  }
                }}
              />
              <Route
                exact
                path="/"
                render={() => {
                  if (isUserAuthenticated(localStorage.getItem("token"))) {
                    return <Home />;
                  } else {
                    return <Redirect to="/login"></Redirect>;
                  }
                }}
              />
              <Route exact path="/contact" component={Contact} />
              <Route
                path="/"
                render={() => {
                  if (isUserAuthenticated(localStorage.getItem("token"))) {
                    return <Redirect to="/"></Redirect>;
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
