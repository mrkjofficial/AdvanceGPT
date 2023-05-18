import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import db from "@/firebase";
import { useSession } from "next-auth/react";
import Chat from "./Chat";

const Chats = () => {
	const { data: session } = useSession();
	const [chats] = useCollection(
		session && query(collection(db, "users", session?.user?.email!, "chats"), orderBy("createdAt", "desc"))
	);

	return (
		<>
			{chats?.docs.map((chat) => (
				<Chat key={chat.id} id={chat.id} />
			))}
		</>
	);
};

export default Chats;
