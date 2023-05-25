"use client";
import { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import db from "@/firebase";

type Props = {
	chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
	const [prompt, setPrompt] = useState("");
	const { data: session } = useSession();
	const model = process.env.NEXT_PUBLIC_OPENAI_MODEL;

	const saveMessage = async () => {
		if (!prompt) {
			return;
		}
		const input = prompt.trim();
		setPrompt("");
		const message: Message = {
			text: input,
			createdAt: serverTimestamp(),
			user: {
				_id: session?.user?.email!,
				name: session?.user?.name!,
				avatar: session?.user?.image! || process.env.NEXT_PUBLIC_AVATAR_API + session?.user?.name!,
			},
		};
		await addDoc(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), message);
		return input;
	};

	const sendMessage = async (prompt: string) => {
		const notification = toast.loading("Thinking...");
		await fetch("/api/ask", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ prompt, chatId, model, session }),
		})
			.then(() => {
				toast.success("Responded!", { id: notification });
			})
			.catch((err) => {
				toast.error(err.message, { id: notification });
			});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const savedPrompt = await saveMessage();
		sendMessage(savedPrompt!);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e as any);
		}
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
							onKeyDown={handleKeyDown}
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
