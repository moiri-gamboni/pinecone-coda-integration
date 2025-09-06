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
	id: coda.makeParameter({
		type: coda.ParameterType.String,
		name: "id",
		description: "ID of the person/vector",
	}),
	subscribed: coda.makeParameter({
		type: coda.ParameterType.Boolean,
		name: "subscribed",
		description: "Whether the person is subscribed",
		optional: true,
	}),
	pastPairings: coda.makeParameter({
		type: coda.ParameterType.NumberArray,
		name: "pastPairings",
		description: "Other person/vector IDs that have already been paired with this person/vector",
		optional: true,
	}),
} as const
