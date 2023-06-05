"use client";
import { Dispatch, SetStateAction } from "react";
import { Bars3Icon, PlusIcon } from "@heroicons/react/24/solid";

type Props = {
	createNewChat: () => void;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ createNewChat, setOpen }: Props) => {
	return (
		<div className="header__container">
			<div className="header__wrapper">
				<button type="button" className="header__menu-button" onClick={() => setOpen(true)}>
					<Bars3Icon />
				</button>
				<h1 className="header__title">New Chat</h1>
				<button type="button" className="header__new-chat-button" onClick={createNewChat}>
					<PlusIcon />
				</button>
			</div>
		</div>
	);
};

export default Header;
