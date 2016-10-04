import React from "react";

class App extends React.Component {

	render() {

		return (
			<div>
				<span>{this.props.valueOfSpan}</span>
				<button onClick={this.props.onSampleClick}>
					Click sample
				</button>
			</div>
		);
	}
}

App.propTypes = {
	valueOfSpan: React.PropTypes.string.isRequired,
	onSampleClick: React.PropTypes.func
};

export default App;