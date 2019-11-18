const srcDir = "../../../src/state_mgmt";

const { getInitialState,
	bootstrap } = require(srcDir + "/reducers");
const addNewSentenceReducer = require(srcDir + "/reducers/add_new_sentence").default;
const { initializeWithSentence,
	addNewSentence } = require(srcDir + "/actions");

const mockState = () => bootstrap(getInitialState(),
				  initializeWithSentence("this is fun"));

describe("addNewSentence and friends.", function () {
  it("baseline tests.", function () {
    const testState = mockState()
    const focusedId = testState.get("focused");
    
    expect(testState.get("objects").size).toBe(4);
    expect(testState.getIn(["objects", focusedId, "type"])).toBe("Sentence");
    expect(testState.get("sandbox").size).toBe(1);
  });

  it("should add a new sentence when called", function () {
    let testState = mockState();
    testState = addNewSentenceReducer(testState, addNewSentence("pretty good"));

    const focusedId = testState.get("focused");

    expect(testState.get("objects").size).toBe(7);
    expect(testState.get("sandbox").size).toBe(2);
  });

  it("focus should shift in the correct way.", function () {
    let testState = mockState();
    const focusedId_A = testState.get("focused");
    expect(testState.getIn(["objects", focusedId_A, "type"])).toBe("Sentence");
    
    testState = addNewSentenceReducer(testState, addNewSentence("pretty good"));
    const focusedId_B = testState.get("focused");

    // expect(focusedId_A == focusedId_B).toBe(false);
    expect(testState.getIn(["objects", focusedId_B, "type"])).toBe("Sentence");
  });
});
