"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { ArrowRightOnRectangleIcon, SunIcon } from "@heroicons/react/24/outline";

const UserMenu = () => {
	const { data: session } = useSession();
	return (
		<div className="user-menu__container">
			{session && (
				<div className="user-menu__details">
					<Image
						className="user-menu__avatar"
						src={session?.user?.image!}
						height={24}
						width={24}
						alt="user-icon"
						priority
					/>
					{session?.user?.name}
				</div>
			)}
			<a className="user-menu__item" onClick={() => {}}>
				<SunIcon className="user-menu__menu-icon" />
				Light mode
			</a>
			<a className="user-menu__item" onClick={() => signOut()}>
				<ArrowRightOnRectangleIcon className="user-menu__menu-icon" />
				Log out
			</a>
		</div>
	);
};

export default UserMenu;
