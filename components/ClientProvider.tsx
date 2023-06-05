"use client";
import db from "@/firebase";
import Header from "./Header";
import SideMenu from "./SideMenu";
import OffCanvas from "./OffCanvas";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();

	const createNewChat = async () => {
		const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
			userId: session?.user?.email,
			createdAt: serverTimestamp(),
		});
		router.push(`/chat/${doc.id}`);
	};

	useEffect(() => {
		setOpen(open);
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [open, setOpen]);

	return (
		<div className="app__container">
			<Header createNewChat={createNewChat} setOpen={setOpen} />
			<Toaster position="top-right" />
			<OffCanvas createNewChat={createNewChat} open={open} setOpen={setOpen} />
			<div className="app__wrapper">
				<aside className="sidebar__container">
					<SideMenu createNewChat={createNewChat} />
				</aside>
				<main className="main__container">{children}</main>
			</div>
		</div>
	);
};

export default ClientProvider;
