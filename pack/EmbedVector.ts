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
			Parameters.subscribed,
			Parameters.pastPairings,
		],
		resultType: coda.ValueType.Boolean,
		execute: async ([index, vector, id, subscribed, pastPairings], context) => {
			const pinecone = new Pinecone(context.fetcher)

			const stringId = String(id)
			const metadata: Record<string, unknown> = {}
			if (typeof subscribed === "boolean") {
				metadata.subscribed = subscribed
			}
			if (Array.isArray(pastPairings)) {
				metadata.pastPairings = pastPairings.map(v => String(v))
			}

			const response = await pinecone.embedVector(index, vector, stringId, metadata)
			return response > 0
		},
	})
}
