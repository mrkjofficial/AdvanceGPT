import admin from "firebase-admin";
import { gptIcon } from "@/assets";
import adminDB from "@/firebaseAdmin";
import completion from "@/lib/completion";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
	answer: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { chatId, model, prompt, session } = req.body;
	if (!chatId) {
		res.status(400).json({ answer: "Invslid Chat ID!" });
		return;
	} else if (!prompt) {
		res.status(400).json({ answer: "Invalid Prompt!" });
		return;
	}
	const response = await completion(model, prompt);
	const message: Message = {
		text: response || "Sorry, I don't understand that yet!",
		createdAt: admin.firestore.Timestamp.now(),
		user: {
			_id: "AdvanceGPT",
			name: "AdvanceGPT",
			avatar: gptIcon,
		},
	};
	await adminDB
		.collection("users")
		.doc(session?.user?.email)
		.collection("chats")
		.doc(chatId)
		.collection("messages")
		.add(message);
	res.status(200).json({ answer: message.text });
};

export default handler;
