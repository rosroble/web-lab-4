import {combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/authReducer";
import {graphReducer} from "./reducers/graphReducer"
import {pointAPI} from "../api/PointService";
import {pointReducer} from "./reducers/pointReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    point: pointReducer,
    graph: graphReducer,
    [pointAPI.reducerPath]: pointAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(pointAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const store = createStore(rootReducer);