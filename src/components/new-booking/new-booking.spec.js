import React from "react";
import { shallow } from "enzyme";
import NewBooking from "./index";

describe("NewBooking", () => {
  const wrapper = shallow(<NewBooking />);

  it("renders the component", () => {
    expect(wrapper.find(".new-booking-container").exists()).toBe(true);
  });
});
