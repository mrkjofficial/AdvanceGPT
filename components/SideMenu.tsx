"use client";
import Chats from "./Chats";
import UserMenu from "./UserMenu";
import { PlusIcon } from "@heroicons/react/24/solid";

type Props = {
	createNewChat: () => void;
};

const SideMenu = ({ createNewChat }: Props) => {
	return (
		<div className="side-menu__container">
			<button className="side-menu__new-chat-button" type="button" onClick={createNewChat}>
				<PlusIcon className="side-menu__new-chat-icon" />
				<p className="side-menu__new-chat-text">New Chat</p>
			</button>
			<Chats />
			<UserMenu />
		</div>
	);
};

export default SideMenu;
