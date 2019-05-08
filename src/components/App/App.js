import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NewBooking from "../new-booking";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={NewBooking} />
      </Switch>
    </BrowserRouter>
  );
}
