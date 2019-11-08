import React from "react";
import { shallow } from "enzyme";

import { Word } from "../../src/state_mgmt/data_types";
import { WordTile } from "../../src/components/WordTile.jsx";


const mockWord = Word("hey");

describe("WordTile", () => {
  const wrapperWithProps = shallow(<WordTile
				     wordStr={mockWord.get("wordStr")}
				     wordId={mockWord.get("id")} />);

  it("should exist", () => {
    expect(wrapperWithProps.length).toBe(1);
  });

  it("has the right class", () => {
    expect(wrapperWithProps.find("div").hasClass("wordTile")).toBe(true);
  });

  it("displays the word correctly", () => {
    expect(wrapperWithProps.find("h1").text()).toBe("hey");
  });

  it("appends the word's input element.", () => {
    const inputId = "#input-" + mockWord.get("id");
    expect(wrapperWithProps.find(inputId).length).toBe(1);
  });
});
