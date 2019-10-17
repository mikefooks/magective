import React from "react";
import { shallow } from "enzyme";

import { WordBoard } from "./WordBoard.jsx";


const mockData = {
  sentenceIds: [ "12345", "67890" ],
  role: "test"
};

describe("WordBoard", () => {
  const wrapperWithProps = shallow(<WordBoard {...mockData} />);
  
  it("should render at all", () => {
    expect(wrapperWithProps.length).toBe(1);
  });

  it("should have the right classes", () => {
    expect(wrapperWithProps.find("div").hasClass("wordBoard")).toBe(true);
    expect(wrapperWithProps.find("div").hasClass("test")).toBe(true);
  });

  console.log(wrapperWithProps.find("div"));
});
