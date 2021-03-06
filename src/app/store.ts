import { applyMiddleware, createStore, Store } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./rootReducer";
import IState from "./types";

const middleware = [thunk];

// TODO: Figure out appropriate initialState typing
function configureStore(initialState: Partial<IState> = {}): Store<IState> {
  return createStore(
    rootReducer(),
    initialState as any,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

const store = configureStore();

export default store;

/** Infer the `RootState` and `AppDispatch` types from the store itself */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
