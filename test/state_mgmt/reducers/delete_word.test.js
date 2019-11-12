const srcDir = "../../../src/state_mgmt";

const { getInitialState,
	bootstrap } = require(srcDir + "/reducers");
const deleteWordReducer = require(srcDir + "/reducers/delete_word").default;
const { initializeWithSentence,
	deleteWord,
	shiftFocus,
	DIRECTION } = require(srcDir + "/actions");

const mockState = () => bootstrap(getInitialState(),
				  initializeWithSentence("this is great"));

function getFocusedObject (state) {
  const focusedId = state.get("focused");
  const focusedObj = state.getIn(["objects", focusedId]);

  return focusedObj;
}

describe("deleteWordReducer and friends", function () {
  it("baseline tests", function () {
    let testState = mockState();
    let focusedObj = getFocusedObject(testState);

    const currentFocusedId = focusedObj.get("id");

    expect(testState.get("objects").size).toBe(4);
    expect(focusedObj.get("type")).toBe("Sentence");

    testState = bootstrap(testState, shiftFocus(DIRECTION.RIGHT));
    focusedObj = getFocusedObject(testState);

    const newFocusedId = focusedObj.get("id");

    expect(focusedObj.get("type")).toBe("Word");
    expect(currentFocusedId == newFocusedId).toBe(false);
  });

  it("deletes a word from both sentence and state['object']", function () {
    let testState = mockState();
    testState = bootstrap(testState, shiftFocus(DIRECTION.RIGHT));

    let focusedObj = getFocusedObject(testState);
    const focusedId = focusedObj.get("id");

    testState = deleteWordReducer(testState, deleteWord(focusedId));

    expect(testState.get("objects").size).toBe(3);
    expect(testState.get("objects").keys()).toEqual(
      expect.not.arrayContaining([ focusedId ])
    );

    // when deleting a word, we don't want focusedId to be
    // pointing to an object that no longer exists.
    expect(testState.get("focused")).not.toBe(focusedId);
  });
});
