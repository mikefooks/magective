import { getInitialState,
	 bootstrap } from "../../../src/state_mgmt/reducers";
import addWordReducer from "../../../src/state_mgmt/reducers/add_word";
import { initializeWithSentence,
	 addWord,
	 shiftFocus,
	 DIRECTION,
	 ADD_WORD_INSERT,
	 ADD_WORD_APPEND } from "../../../src/state_mgmt/actions"


const mockState = bootstrap(getInitialState(),
			    initializeWithSentence("hey there"));

describe("addWordReducer and friends", () => {
  const fakeAction = addWord({ type: ADD_WORD_INSERT });
  const newState = addWordReducer(mockState, fakeAction);
  
  it("mockState baseline tests", () => {
    expect(mockState.get("objects").size).toBe(3);
    expect(mockState.get("editMode")).toBe(false);
  });
});
