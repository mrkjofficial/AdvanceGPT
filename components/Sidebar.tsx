"use client";
import db from "@/firebase";
import Chats from "./Chats";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


const Sidebar = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const createNewChat = async () => {
		const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
			userId: session?.user?.email,
			createdAt: serverTimestamp(),
		});
		router.push(`/chat/${doc.id}`);
	};
	
	return (
		<div className="sidebar__wrapper">
			<button className="sidebar__new-chat-button" onClick={createNewChat}>
				<PlusIcon className="sidebar__new-chat-icon" />
				<p className="sidebar__new-chat-text">New Chat</p>
			</button>
			<Chats />
			<UserMenu />
		</div>
	);
};

export default Sidebar;
