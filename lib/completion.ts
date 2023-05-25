import openai from "./configuration";

const completion = async (model: string, prompt: string) => {
	const res = await openai
		.createChatCompletion({
			model: model,
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
		})
		.then((res) => res.data.choices[0].message?.content)
		.catch((err) => err.message);
	return res;
};

export default completion;
