const srcDir = "../../../src/state_mgmt";

const { getInitialState,
	bootstrap } = require(srcDir + "/reducers");
const commitSentenceReducer = require(srcDir + "/reducers/commit_sentence").default;
const { initializeWithSentence,
 	commitSentence,
	DIRECTION } = require(srcDir + "/actions");

const mockState = () => bootstrap(getInitialState(),
				  initializeWithSentence("good to go"));

describe("commitSentenceReducer and friends", function () {
  it("baseline tests", function () {
    const testState = mockState();
    const focusedId = testState.get("focused");
    const focusedType = testState.getIn(["objects", focusedId, "type"]);

    expect(focusedType).toBe("Sentence");
    expect(testState.get("objects").size).toBe(4);
    expect(testState.get("sandbox").size).toBe(1);
    expect(testState.get("committed").size).toBe(0);
  });

  it("moves a sentence from the sandbox to committed", function () {
    let testState = mockState();
    const focusedId = testState.get("focused");

    testState = commitSentenceReducer(testState, commitSentence(focusedId));

    expect(testState.get("sandbox").size).toBe(0);
    expect(testState.get("committed").size).toBe(1);
  });
});
