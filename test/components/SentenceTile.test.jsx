import React from "react";
import { shallow } from "enzyme";

import { Sentence } from "../../src/state_mgmt/data_types";
import { SentenceTile } from "../../src/components/SentenceTile.jsx";


const mockSentence = new Sentence("this is good.");

describe("SentenceTile", () => {
  const mockClickFunc = jest.fn();
  const wrapperWithProps = shallow(<SentenceTile
				     sentence={mockSentence}
				     sentenceToTarget={mockClickFunc} />);
  
  it("should render at all", () => {
    expect(wrapperWithProps.length).toBe(1);
  });

  it("should have the correct classes", () => {
    expect(wrapperWithProps.hasClass("sentenceTile")).toBe(true);
  });

  it("should have the right number of child elements", () => {
    expect(wrapperWithProps.children().length).toBe(3);
  });

  it("should respond to click events", () => {
    wrapperWithProps.find("div").simulate("click");
    expect(mockClickFunc).toHaveBeenCalled();
  });
});
