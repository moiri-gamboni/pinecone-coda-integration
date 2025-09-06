import * as coda from "@codahq/packs-sdk"

export class Pinecone {
	// API Key auto-included by the fetcher
	constructor(private readonly fetcher: coda.Fetcher) {}

	async embedVector(index: string, vector: number[], id: string, metadata?: Record<string, unknown>): Promise<number> {
		const requestBody: PineconeUpsertVectorsRequest = {
			vectors: [ {
				id: id,
				values: vector,
				...(metadata != null ? { metadata } : {}),
			} ]
		}

		const response = await this.fetcher.fetch<PineconeUpsertVectorsResponse>({
			method: "POST",
			url: await this.url(index, "vectors/upsert"),
			headers: this.headers(),
			body: JSON.stringify(requestBody),
		})

		return response.body?.upsertedCount ?? 0
	}

	async vectorSearch(index: string, vector: number[], topK: number): Promise<PineconeVectorQueryResponse["matches"]> {
		const requestBody: PineconeVectorQueryRequest = {
			vector,
			topK,
			includeValues: false,
			includeMetadata: false,
		}

		const response = await this.fetcher.fetch<PineconeVectorQueryResponse>({
			method: "POST",
			url: await this.url(index, "query"),
			headers: this.headers(),
			body: JSON.stringify(requestBody),
		})

		return response.body?.matches ?? []
	}

	private async url(index: string, path: string): Promise<string> {
		const response = await this.fetcher.fetch<PineconeIndexResponse>({
			method: "GET",
			url: `https://api.pinecone.io/indexes/${index}`,
			headers: this.headers(),
		})

		if (response.body == null) {
			throw new Error(`Failed to get host for ${index}`)
		}

		return `https://${response.body.host}/${path}`
	}

	private headers(): Record<string, string> {
		return {
			"Content-Type": "application/json",
		}
	}
}

/**
 * https://docs.pinecone.io/reference/api/2025-04/control-plane/describe_index
 */
type PineconeIndexResponse = {
	name: string,
	metric: "cosine" | "euclidean" | "dotproduct",
	dimension: number,
	status: {
		ready: boolean,
		state: string
	},
	host: string,
}

/**
 * https://docs.pinecone.io/reference/api/2025-04/data-plane/upsert
 */
type PineconeUpsertVectorsRequest = {
	vectors: {
		id: string,
		values: number[],
		metadata?: Record<string, unknown>,
	}[],
}
type PineconeUpsertVectorsResponse = {
	upsertedCount: number,
}

/**
 * https://docs.pinecone.io/reference/api/2025-04/data-plane/query
 */
type PineconeVectorQueryRequest = {
	topK: number,
	includeValues?: boolean,
	includeMetadata?: boolean,
	vector: number[],
}
type PineconeVectorQueryResponse = {
	matches: {
		id: string,
		score: number,
		values?: number[],
		metadata?: object,
	}[],
}
