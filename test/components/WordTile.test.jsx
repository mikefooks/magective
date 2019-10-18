import React from "react";
import { shallow } from "enzyme";

import { Word } from "../../src/state_mgmt/data_types";
import { WordTile } from "../../src/components/WordTile.jsx";


const mockWord = new Word("hey");

describe("WordTile", () => {
  const mockClickFunc = jest.fn();
  const wrapperWithProps = shallow(<WordTile
				     word={mockWord}
				     switchActivate={mockClickFunc} />);

  it("should exist", () => {
    expect(wrapperWithProps.length).toBe(1);
  });

  it("has the right class", () => {
    expect(wrapperWithProps.find("div").hasClass("wordTile")).toBe(true);
  });

  it("displays the word correctly", () => {
    expect(wrapperWithProps.find("h1").text()).toBe("hey");
  });

  it("responds to click events", () => {
    wrapperWithProps.find("h1").simulate("click");
    expect(mockClickFunc).toHaveBeenCalled();
  });
});
