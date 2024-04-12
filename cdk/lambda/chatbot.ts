'use strict';
const {
	BedrockRuntimeClient,
	InvokeModelCommand,
} = require('@aws-sdk/client-bedrock-runtime');

type ChatbotEvent = {
    arguments: {
        prompt: string;
        category: string;
    }
}
const client = new BedrockRuntimeClient();

exports.handler = async (event: ChatbotEvent) => {
    console.log(JSON.stringify(event))

	const PROMPT =
		`You are an expert in home renovations. Be prepared to answer questions about ${event.arguments.category}. ${event.arguments.prompt}`;

	const input = {
		body: `{"prompt":"${PROMPT}","maxTokens":200,"temperature":0,"topP":1,"stopSequences":[],"countPenalty":{"scale":0},"presencePenalty":{"scale":0},"frequencyPenalty":{"scale":0}}`,
		contentType: 'application/json',
		accept: 'application/json',
		modelId: 'ai21.j2-ultra-v1',
	};

	console.log(input);

	const command = new InvokeModelCommand(input);

	let data, completions;

	try {
		data = await client.send(command);

		completions = JSON.parse(new TextDecoder().decode(data.body)).completions;

		const result = completions[0].data.text;
		console.log(result);
        return result;
	} catch (error) {
		console.error(error);
	}
};
