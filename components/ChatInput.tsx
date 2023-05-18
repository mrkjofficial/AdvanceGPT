"use client";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-hot-toast";
import db from "@/firebase";

type Props = {
	id: string;
};

const ChatInput = ({ id }: Props) => {
	const [prompt, setPrompt] = useState("");
	const { data: session } = useSession();
	// useSWR
	const model = "text-davinci-003";
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!prompt) {
			return;
		}
		const input = prompt.trim();
		setPrompt("");
		const message: Message = {
			text: input,
			createdAt: new Date().toISOString(),
			user: {
				_id: session?.user?.email!,
				name: session?.user?.name!,
				avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
			},
		};
		await addDoc(collection(db, "users", session?.user?.email!, "chats", id, "messages"), message);
		const notification = toast.loading("Loading...");
		await fetch("/api/ask", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				prompt: input,
				chatId: id,
				model: model,
				session: session,
			}),
		}).then(() => {
			toast.success("Success!", { id: notification });
		});
	};
	return (
		<>
			<form className="chat-input__form" onSubmit={handleSubmit}>
				<div className="chat-input__container">
					<div className="chat-input__wrapper">
						<textarea
							className="chat-input__textarea"
							disabled={!session}
							placeholder="Send a message."
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
						/>
						<button className="chat-input__button" disabled={!prompt || !session} type="submit">
							<PaperAirplaneIcon className="chat-input__icon" />
						</button>
					</div>
				</div>
			</form>
			<div className="chat-input__disclaimer">
				<span>
					Free Research Preview. AdvanceGPT may produce inaccurate information about people, places, or facts.
				</span>
			</div>
		</>
	);
};

export default ChatInput;
