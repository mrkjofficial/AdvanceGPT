import db from "@/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

type Props = {
	id: string;
};

const Chat = ({ id }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();
	const [active, setActive] = useState(false);

	const [messages] = useCollection(
		collection(db, "users", session?.user?.email!, "chats", id, "messages")
	);

	useEffect(() => {
		if (!pathname) {
			return;
		}
		setActive(pathname.includes(id));
	}, [id, pathname]);

	const removeChat = async () => {
		await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
		router.replace("/");
	};

	return (
		<Link className={`chat__container ${active && "bg-gray-700/50 rounded-md"}`} href={`/chat/${id}`}>
			<ChatBubbleLeftIcon className="chat__message-icon" />
			<p className="chat__title">{messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}</p>
			<TrashIcon className={`chat__delete-icon ${!active && "hidden"}`} onClick={removeChat}/>
		</Link>
	);
};

export default Chat;
