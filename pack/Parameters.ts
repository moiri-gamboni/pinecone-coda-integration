import * as coda from "@codahq/packs-sdk"

export const Parameters = {
	index: coda.makeParameter({
		type: coda.ParameterType.String,
		name: "index",
		description: "Pinecone index name",
	}),
	vector: coda.makeParameter({
		type: coda.ParameterType.NumberArray,
		name: "vector",
		description: "Vector to query with",
	}),
	topK: coda.makeParameter({
		type: coda.ParameterType.Number,
		name: "topK",
		description: "Number of results to return",
		optional: true,
	}),
} as const
