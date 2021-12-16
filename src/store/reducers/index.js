
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

import{persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cartReducer"]
    // blacklist: 제외 reducer
};

const rootReducer = combineReducers({
    cartReducer
});

export default persistReducer(persistConfig, rootReducer);
