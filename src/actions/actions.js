
export default function (navigateTo, dispatch) {
	return {
		onSampleClick: function() {
			dispatch({type: "RECEIVE_SAMPLE_ACTION", data: "after action"});
//			navigateTo("root")
		}
	}
};
