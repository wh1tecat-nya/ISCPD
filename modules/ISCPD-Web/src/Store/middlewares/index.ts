import { applyMiddleware, Middleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import { History } from "history";
import { routerMiddleware } from "connected-react-router";

export default (history: History) => {
	const middlewares: Middleware[] = [ThunkMiddleware, routerMiddleware(history)];

	return applyMiddleware(...middlewares);
};
