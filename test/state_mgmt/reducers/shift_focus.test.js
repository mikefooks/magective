const srcDir = "../../../src/state_mgmt";

const { getInitialState,
	bootstrap } = require(srcDir + "/reducers");
const shiftFocusReducer = require(srcDir + "/reducers/shift_focus").default;
const { initializeWithSentence,
	shiftFocus,
	DIRECTION } = require(srcDir + "/actions");

const mockState = () => bootstrap(getInitialState(),
				  initializeWithSentence("pretty cool beans"));

function getFocusedObject (state) {
  const focusedId = state.get("focused");
  const focusedObj = state.getIn(["objects", focusedId]);

  return focusedObj;
}

describe("shiftFocusReducer and friends", function () {
  it("baseline tests", function () {
    let testState = mockState();
    let focusedObj = getFocusedObject(testState);

    expect(focusedObj.get("type")).toBe("Sentence");

    let wordIdArray = focusedObj.get("words")
				.map(w => w.get("id"));

    expect(wordIdArray.size).toBe(3);
    expect(wordIdArray).toEqual(
      expect.not.arrayContaining([ focusedObj.get("id") ])
    );
  });

  it("moves from sentence-level to word-level focus", function () {
    let testState = mockState();
    let oldFocusedObj = getFocusedObject(testState);

    testState = shiftFocusReducer(testState, shiftFocus(DIRECTION.RIGHT));

    let newFocusedObj = getFocusedObject(testState);

    expect(oldFocusedObj.get("id")).not.toBe(
      newFocusedObj.get("id")
    );

    expect(newFocusedObj.get("type")).toBe("Word");
  });

  it("moves from one word to another in the correct direction", function () {
    let testState = mockState();
    const sentenceObj = getFocusedObject(testState);
    const wordIdList = sentenceObj.get("words")
				  .map(w => w.get("id"));

    for (let i = 0; i < 3; i++) {
      testState = shiftFocusReducer(testState, shiftFocus(DIRECTION.RIGHT));
    }
    
    let focusedObj = getFocusedObject(testState);
    let focusedIdx = wordIdList.indexOf(focusedObj.get("id"));
    
    expect(focusedIdx).toBe(2);

    testState = shiftFocusReducer(testState, shiftFocus(DIRECTION.LEFT));

    focusedObj = getFocusedObject(testState);
    focusedIdx = wordIdList.indexOf(focusedObj.get("id"));

    expect(focusedIdx).toBe(1);
  });

  // TODO: sentence-level focus shifting tests.
});
