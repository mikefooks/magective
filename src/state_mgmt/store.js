import { createStore } from "redux";

import { bootstrap } from "./reducers/entry";

const store = createStore(bootstrap);

export default store;
