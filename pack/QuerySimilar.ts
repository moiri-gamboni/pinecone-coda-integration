import * as coda from "@codahq/packs-sdk"
import { Pinecone } from "../pinecone/Pinecone"
import { Parameters } from "./Parameters"

const QuerySimilarResultsSchema = coda.makeObjectSchema({
	properties: {
		id: { type: coda.ValueType.String },
		score: { type: coda.ValueType.Number },
		// metadata: { type: coda.ValueType.Object },
	},
})

export function QuerySimilar(pack: coda.PackDefinitionBuilder) {
	pack.addFormula({
		name: "QuerySimilar",
		description: "Query pinecone with a vector",
		parameters: [
			Parameters.index,
			Parameters.vector,
			Parameters.topK,
		],
		resultType: coda.ValueType.Array,
		items: QuerySimilarResultsSchema,
		execute: async ([index, vector, topK = 5], context) => {
			const pinecone = new Pinecone(context.fetcher)

			const response = await pinecone.vectorSearch(index, vector, topK)
			return response
		},
	})
}
