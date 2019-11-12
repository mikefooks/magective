const srcDir = "../../../src/state_mgmt";

const { getInitialState,
	bootstrap } = require(srcDir + "/reducers");
const updateEditedWordReducer = require(srcDir + "/reducers/update_edited_word").default;
const { initializeWithSentence,
	shiftFocus,
	toggleEditMode,
	updateEditedWord,
	DIRECTION } = require(srcDir + "/actions");


const mockState = () => bootstrap(getInitialState(),
				  initializeWithSentence("good times"));


describe("updateEditedWord and friends", function () {
  it("mockState baseline tests", function () {
    let testState = bootstrap(mockState(), shiftFocus(DIRECTION.RIGHT));
    testState = bootstrap(testState, toggleEditMode());
    
    const focusedId = testState.get("focused");
    const focusedType = testState.getIn(["objects", focusedId, "type"])
    expect(focusedType).toBe("Word");
    expect(testState.get("objects").size).toBe(3);
    expect(testState.get("editMode")).toBe(true);
  });

  it("change the wordStr when one word is given as replacement.", function () {
    let testState = bootstrap(mockState(), shiftFocus(DIRECTION.RIGHT));
    testState = bootstrap(testState, toggleEditMode());

    const focusedId = testState.get("focused");
    const currentWordStr = testState.getIn(["objects", focusedId, "wordStr"]);

    testState = updateEditedWordReducer(testState,
					updateEditedWord("great", focusedId));

    const newWordStr = testState.getIn(["objects", focusedId, "wordStr"]);

    expect(currentWordStr).toBe("good");
    expect(newWordStr).toBe("great");
  });

  it("creates new word objects when two or more new words are given", function () {
    let testState = bootstrap(mockState(), shiftFocus(DIRECTION.RIGHT));
    testState = bootstrap(testState, toggleEditMode());

    const focusedId = testState.get("focused");
    const currentWordStr = testState.getIn(["objects", focusedId, "wordStr"]);

    testState = updateEditedWordReducer(testState,
					updateEditedWord("day sir", focusedId));

    expect(testState.getIn(["objects", focusedId])).toBe(undefined);
    expect(testState.get("objects").size).toBe(4);
  });
});

