import { createStore as reduxCreateStore, compose, Store, Action } from "redux";
import { persistStore, Persistor } from "redux-persist";
import { History } from "history";
import { State } from "../Types";

import { createReducers } from "./modules";
import createMiddlewares from "./middlewares";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function createStore(
	history: History
): {
	store: Store<State, Action>;
	persistor: Persistor;
} {
	const store = reduxCreateStore(
		createReducers(history),
		composeEnhancers(createMiddlewares(history))
	);
	const persistor = persistStore(store);

	return { store, persistor };
}

export default createStore;
export { actions, selectors } from "./modules";
