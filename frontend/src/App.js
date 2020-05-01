import React, { useState, useEffect } from "react";
import Header from "./Header";
import Content from "./Content";
import Login from "./Login";
import Footer from "./Footer";
import Register from "./Register";
import Home from "./Home";
import SurveySolve from "./SurveySolve";
import SurveyStats from "./SurveyStats";
import FAQ from "./FAQ";
import { Helmet } from "react-helmet";
import { isUserAuthenticated, getUserRole } from "./Auth.js";
import Contact from "./Contact";
import Confirm from "./Confirm";
import Terms from "./Terms";
import CreateSurvey from "./CreateSurvey";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  const [me, setMe] = useState({ name: "", coins: 0 });
  const [termsAccepted, setTermsAccepted] = useState(localStorage.getItem("gdpr") === "true");

  const updateMe = async () => {
    if (!isUserAuthenticated(localStorage.getItem("token"))) return;

    const jwt_token = localStorage.getItem("token");

    let res;
    try {
      res = await axios.get("http://192.168.100.6:8888/users/me", {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });
      setMe(res.data);
    } catch (e) {
      alert("Get user details failed.");
    }
  };

  useEffect(() => {
    updateMe();
  }, [termsAccepted]);

  return (
    <BrowserRouter>
      <Helmet>
        <title>Survket</title>
      </Helmet>
      <div className="app">
        <Header me={me} />
        <div className="content-footer">
          <Content>
            <Switch>
              {!termsAccepted && (
                <Route
                  render={() => {
                    return <Terms callback={setTermsAccepted} />;
                  }}
                />
              )}
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
                    return <Login updateMe={updateMe} />;
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
                      return <SurveySolve {...props} updateMe={updateMe} />;
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
                    return <Home me={me} />;
                  } else {
                    return <Redirect to="/login"></Redirect>;
                  }
                }}
              />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/terms" component={Terms} />
              <Route
                exact
                path="/create"
                render={() => {
                  if (isUserAuthenticated(localStorage.getItem("token"))) {
                    return <CreateSurvey updateMe={updateMe} />;
                  } else {
                    return <Redirect to="/login"></Redirect>;
                  }
                }}
              />
              <Route
                exact
                path="/confirm/:token"
                render={(props) => {
                  return <Confirm {...props} />;
                }}
              />
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
