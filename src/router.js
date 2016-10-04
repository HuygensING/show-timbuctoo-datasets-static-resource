import React from "react";
import { Router, Route, hashHistory} from "react-router";
import { Provider, connect } from "react-redux";
import actions from "./actions/actions";
import App from "./components/app";
import store from "./reducers/store";

var urls = {
	root() {
		return "/";
	}
};

export function navigateTo(key, args) {
	hashHistory.push(urls[key].apply(null, args));
}

const connectComponent = connect((state) => ({valueOfSpan: state.sample.data }), (dispatch) => actions(navigateTo, dispatch));

const router = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path={urls.root()} component={connectComponent(App)} />
		</Router>
	</Provider>
);

export default router;