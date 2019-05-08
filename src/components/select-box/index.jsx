import React, { useState } from "react";

import Select from "react-dropdown-select";

export default function SelectBox({
  defaultValue,
  options,
  placeholder,
  onChange
}) {
  return (
    <Select
      values={defaultValue}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      labelField="name"
      valueField="id"
    />
  );
}
