"use client";
import db from "@/firebase";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from "@heroicons/react/24/outline";

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
		<>
			{messages?.docs.length === 0 && (
				<div className="home__container">
					<h1 className="home__heading">AdvanceGPT</h1>
					<div className="home__info-container">
						<div className="home__info-wrapper">
							<div className="home__info">
								<SunIcon className="home__info-icon" />
								<h2>Examples</h2>
							</div>
							<div className="home__info-group">
								<button
									className="home__info-button"
									type="button"
								>{`"Explain quantum computing in simple terms" →`}</button>
								<button
									className="home__info-button"
									type="button"
								>{`"Got any creative ideas for a 10 year old's birthday?" →`}</button>
								<button
									className="home__info-button"
									type="button"
								>{`"How do I make an HTTP request in Javascript?" →`}</button>
							</div>
						</div>
						<div className="home__info-wrapper">
							<div className="home__info">
								<BoltIcon className="home__info-icon" />
								<h2>Capabilities</h2>
							</div>
							<div className="home__info-group">
								<p className="home__info-text">{`Remembers what user said earlier in the conversation`}</p>
								<p className="home__info-text">{`Allows user to provide follow-up corrections`}</p>
								<p className="home__info-text">{`Trained to decline inappropriate requests`}</p>
							</div>
						</div>
						<div className="home__info-wrapper">
							<div className="home__info">
								<ExclamationTriangleIcon className="home__info-icon" />
								<h2>Limitations</h2>
							</div>
							<div className="home__info-group">
								<p className="home__info-text">{`May occasionally generate incorrect information`}</p>
								<p className="home__info-text">{`May occasionally produce harmful instructions or biased content`}</p>
								<p className="home__info-text">{`Limited knowledge of world and events after 2021`}</p>
							</div>
						</div>
					</div>
				</div>
			)}
			{messages?.docs.length! > 0 && (
				<div className="new-chat__container">
					{messages?.docs.map((message) => (
						<Message key={message.id} message={message.data()} />
					))}
					<div ref={messagesEndRef} />
				</div>
			)}
		</>
	);
};

export default NewChat;
