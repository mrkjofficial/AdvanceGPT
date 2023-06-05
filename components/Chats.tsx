import Chat from "./Chat";
import db from "@/firebase";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";

const Chats = () => {
	const { data: session } = useSession();
	const [chats] = useCollection(
		session && query(collection(db, "users", session?.user?.email!, "chats"), orderBy("createdAt", "desc"))
	);

	return (
		<div className="chats__container">
			{chats?.docs.map((chat) => (
				<Chat key={chat.id} id={chat.id} />
			))}
		</div>
	);
};

export default Chats;
