import { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";

type Data = {
	answer: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { chatID, model, prompt, session } = req.body;
	if (!chatID) {
		res.status(400).json({ answer: "Invslid Chat ID!" });
		return;
	} else if (!prompt) {
		res.status(400).json({ answer: "Invalid Prompt!" });
		return;
	} else {
		// query
	}

	res.status(200).json({ answer: "John Doe" });
};

export default handler;
