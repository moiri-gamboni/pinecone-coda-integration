import * as coda from "@codahq/packs-sdk"
import { Pinecone } from "../pinecone/Pinecone"
import { Parameters } from "./Parameters"

export function EmbedVector(pack: coda.PackDefinitionBuilder) {
	pack.addFormula({
		name: "EmbedVector",
		description: "Add a vector to a pinecone index.",
		parameters: [
			Parameters.index,
			Parameters.vector,
			Parameters.id,
		],
		resultType: coda.ValueType.Boolean,
		execute: async ([index, vector, id], context) => {
			const pinecone = new Pinecone(context.fetcher)

			const response = await pinecone.embedVector(index, vector, id)
			return response > 0
		},
	})
}
