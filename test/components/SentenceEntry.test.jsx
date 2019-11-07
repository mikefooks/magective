import React from "react";
import { shallow } from "enzyme";

import SentenceEntry from "../../src/components/SentenceEntry.jsx";

describe("SentenceEntry", () => {
  const wrapper = shallow(<SentenceEntry />);
  
  it("renders a div with two elements: a text input and a button", () => {
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.childAt(0).type()).toBe("input");
    expect(wrapper.childAt(1).type()).toBe("button");
  });
});

