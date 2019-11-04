import { createStore } from "redux";

import { bootstrap } from "./reducers";

const store = createStore(bootstrap);

export default store;
