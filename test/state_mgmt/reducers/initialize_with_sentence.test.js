const srcDir = "../../../src/state_mgmt";

const { getInitialState,
	bootstrap } = require(srcDir + "/reducers");
const initializeWithSentenceReducer = require(srcDir + "/reducers/initialize_with_sentence").default;
const { initializeWithSentence } = require(srcDir + "/actions");

const mockState = () => bootstrap(getInitialState(), { type: null });


describe("initializeWithSentence and friends", function () {
  it("baseline tests", function () {
    const testState = mockState();
    expect(testState.get("sandbox").size).toBe(0);
    expect(testState.get("objects").size).toBe(0);
  });

  it("adds an initial sentence", function () {
    let testState = mockState();
    testState = initializeWithSentenceReducer(testState, initializeWithSentence("great job"));

    expect(testState.get("objects").size).toBe(3);
    expect(testState.get("sandbox").size).toBe(1);
  });
});
