"use client";
import db from "@/firebase";
import Message from "./Message";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { useEffect, useRef } from "react";

type Props = {
	chatId: string;
};

const NewChat = ({ chatId }: Props) => {
	const { data: session } = useSession();
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const [messages] = useCollection(
		session &&
			query(
				collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
				orderBy("createdAt", "asc")
			)
	);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="new-chat__container">
			{messages?.docs.map((message) => (
				<Message key={message.id} message={message.data()} />
			))}
			<div ref={messagesEndRef} />
		</div>
	);
};

export default NewChat;
