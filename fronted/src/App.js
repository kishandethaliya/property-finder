import React, { PureComponent, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import NotFoundPage from "./containers/NotFoundPage";
import { indexRoutes } from "./containers/routes";
import Loader from "./containers/components/Loader";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AppWrapper = styled.div``;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const renderRoutes = indexRoutes.map((item, key) => (
      <Route exact path={item.path} component={item.component} key={key} />
    ));

    return (
      <BrowserRouter>
        <AppWrapper>
          <Suspense fallback={<Loader />}>
            <Switch>
              {renderRoutes}
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </AppWrapper>
      </BrowserRouter>
    );
  }
}

export default App;
