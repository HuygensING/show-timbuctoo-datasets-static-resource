import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import xhr from "xhr";

document.addEventListener("DOMContentLoaded", () => {
	xhr(`${process.env.server}/v2.1/gremlin/datasets`, (err, resp, body) => {
		const data = JSON.parse(body);
		const nodes = data.nodes.map((node, id) => ({...node, id: id}));
		const links = data.links.map((link, id) => ({...link, id: id}));
		const datasets = nodes
			.filter((node) => node.type === "dataset")
			.map((node) => ({
				...node,
				collections: links
					.filter((link) => link.source === node.id && link.type === "hasCollection")
					.map((link) => { return ({
						...nodes.find((node) => node.id === link.target),
						entities: links
							.filter((link1) => link1.target === link.target && link1.type ==="isInCollection")
							.map((link1) => nodes.find((node1) => node1.id === link1.source))
					})})
			}));

		ReactDOM.render(<App datasets={datasets} links={links} />, document.getElementById("app"));
	});
});