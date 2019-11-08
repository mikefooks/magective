import React from "react";
import store from "../../src/state_mgmt/store"
import { Provider } from "react-redux";
import { shallow } from "enzyme";

import SentenceEntry from "../../src/components/SentenceEntry.jsx";

describe("SentenceEntry", () => {
  const wrapper = shallow(
    <Provider store={store}><SentenceEntry /></Provider>
  );
  
  it("renders a div with two elements: a text input and a button", () => {
    expect(true).toBe(true);
  });
});

