import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			linkLines: [],
			width: window.innerWidth
		};

	}

	componentDidMount() {
		window.addEventListener("resize", () => {
			this.setState({width: window.innerWidth}, () => this.generateLines())
		});
		this.generateLines();
	}

	generateLines() {
		const { links } = this.props;
		const linkLines = links.map((link) => {
			const sourceRect = this.refs[link.source].getBoundingClientRect();
			const targetRect = this.refs[link.target].getBoundingClientRect();
			return {
				source: { x: sourceRect.x + sourceRect.width / 2, y: sourceRect.y + sourceRect.height / 2},
				target: { x: targetRect.x + targetRect.width / 2, y: targetRect.y + targetRect.height / 2},
				type: link.type
			}
		});
		this.setState({linkLines: linkLines});
	}

	render() {
		const { datasets } = this.props;
		const { linkLines, width } = this.state;
		
		const height = 10000;
		const interval = (width - 80)  / datasets.length;
		return (
			<svg style={{position: "absolute", top: 0, left: 0}}
				width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{linkLines.map((linkLine, idx) => (
					<g key={idx}>
						<line x1={linkLine.source.x} y1={linkLine.source.y}
							x2={linkLine.target.x} y2={linkLine.target.y} 
							strokeWidth={0.5} stroke="black" />
						{linkLine.type !== "isInCollection" && linkLine.type !== "hasCollection" ? 
							<g transform={`translate(${(linkLine.source.x + linkLine.target.x) / 2 - 50}, ${(linkLine.source.y + linkLine.target.y) / 2})`}>
								<text>{linkLine.type}</text>
							</g>
						: null}
					</g>
				))}

				{datasets.map((dataset, idx) => {
					const collectionInterval = interval / dataset.collections.length;
					return (
						<g key={dataset.label} transform={`translate(${(0.5*interval) +  (idx) * interval }, 10)`}>
							<circle r={10} ref={dataset.id} />
							<g transform="translate(12, 6)">
								<text>Dataset: {dataset.label}</text>
							</g>
							<g transform={`translate(${-0.5*interval}, 100)`}>
								{dataset.collections.map((collection, idx) => (
									<g key={collection.label} transform={`translate(${(0.5*collectionInterval) + collectionInterval * idx}, 0)`}>
										<circle r={10} ref={collection.id} />
										<g transform="translate(12, 6)">
											<text>Collection: {collection.label}</text>
										</g>
										{collection.entities.map((entity, idx) => (
											<g key={entity.id} transform={`translate(0, ${(idx+1) * 30})`}>
												<circle r={5} ref={entity.id} />
												<g transform="translate(5, 2)">
													<text>{entity.label}</text>
												</g>
											</g>
										))}
									</g>
								))}

							</g>
						</g>
					);
				})}
			</svg>
		);
	}
}

export default App;