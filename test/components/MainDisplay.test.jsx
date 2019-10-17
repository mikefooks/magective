import React from "react";
import { shallow } from "enzyme";

import MainDisplay from "../../src/components/MainDisplay.jsx";


describe("MainDisplay", () => {
  const wrapper = shallow(<MainDisplay />);
  
  it("should render two elements wrapped in a div", () => {
    expect(wrapper.children().length).toBe(2);
  });

  it("should have the right class name", () => {
    expect(wrapper.children()
		  .find("div")
		  .hasClass("mainDisplay")).toBe(true);
  });
});
