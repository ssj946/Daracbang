import { combineReducers } from "redux";
import { memberReducer } from "./memberReducer";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

const rootRedcuer = combineReducers({ memberReducer });
const persistConfig: any = {
  key: "root",
  storage: storage,
  whitelist: ["memberReducer"],
};

export default persistReducer(persistConfig, rootRedcuer);
export type RootState = ReturnType<typeof rootRedcuer>;
