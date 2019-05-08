import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SelectBox({ selected, onChange }) {
  return <DatePicker selected={selected} onChange={onChange} />;
}
