import React, { useState, useEffect } from "react";

import Form from "./form";
import SelectHotel from "./select-hotel";

import "./style.less";

const tempDay = new Date();
const tomorrow = new Date(tempDay.setDate(tempDay.getDate() + 1));

const defaultState = {
  location: null,
  reward: null,
  from: new Date(),
  to: tomorrow,
  guests: 1,
  rooms: 1,
  hotels: [],
  filter: 1,
  step: 0
};

export default function NewBooking({}) {
  const [state, setState] = useState(defaultState);

  const steps = [
    <Form state={state} setState={setState} />,
    <SelectHotel state={state} setState={setState} />
  ];

  return (
    <div className="container">
      <div>{steps[state.step]}</div>
    </div>
  );
}
