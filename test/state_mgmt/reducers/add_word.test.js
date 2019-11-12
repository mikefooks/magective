const srcDir = "../../../src/state_mgmt";

const { getInitialState,
	bootstrap } = require(srcDir + "/reducers");
const addWordReducer = require(srcDir + "/reducers/add_word").default;
const { initializeWithSentence,
	addWord,
	shiftFocus,
	DIRECTION,
	ADD_WORD_INSERT,
	ADD_WORD_APPEND } = require(srcDir + "/actions");


const mockState = () => bootstrap(getInitialState(),
				  initializeWithSentence("hey there"));

describe("addWordReducer and friends", function () {
  const insertWordAction = addWord(ADD_WORD_INSERT);
  const appendWordAction = addWord(ADD_WORD_APPEND);

  it("mockState baseline tests", () => {
    const testState = mockState();
    
    expect(testState.get("objects").size).toBe(3);
    expect(testState.get("editMode")).toBe(false);
  });

  it("does nothing when focus is at the sentence level", function () {
    const testState = addWordReducer(mockState(), appendWordAction);
    
    const focusedId = testState.get("focused");
    const focusedType = testState.getIn(["objects", focusedId, "type"]);
    expect(focusedType).toBe("Sentence");
    expect(testState.get("objects").size).toBe(3);
    expect(testState.get("editMode")).toBe(false);
  });

  it("should insert a new blank word when focus is at word level.", function () {
    let testState = bootstrap(mockState(), shiftFocus(DIRECTION.RIGHT));
    testState = addWordReducer(testState, addWord(ADD_WORD_INSERT));

    const focusedId = testState.get("focused");
    const focusedType = testState.getIn(["objects", focusedId, "type"]);
    expect(focusedType).toBe("Word");
    expect(testState.get("objects").size).toBe(4);
    expect(testState.get("editMode")).toBe(true);
  });

  it("insert places new word in front of focused word", function () {
    let testState = mockState();
    
    const sentenceId = testState.get("focused");

    testState = bootstrap(testState, shiftFocus(DIRECTION.RIGHT));
    const initialFocused = testState.get("focused");

    testState = addWordReducer(testState, addWord(ADD_WORD_INSERT));
    const insertedId = testState.get("focused");
    const wordIds = testState.getIn(["objects", sentenceId, "words"])
			     .map(w => w.get("id"));
    
    const initialFocusedIdx = wordIds.indexOf(initialFocused);
    const insertedIdx = wordIds.indexOf(insertedId);

    expect(insertedIdx).toBeLessThan(initialFocusedIdx);
    expect(initialFocusedIdx - insertedIdx).toBe(1);
  });
});
