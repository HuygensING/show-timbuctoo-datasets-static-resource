const initialState = {
	data: "before action",
	another: "x"
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_SAMPLE_ACTION":
			return {
				...state,
				data: action.data
			};
	}

	return state;
}