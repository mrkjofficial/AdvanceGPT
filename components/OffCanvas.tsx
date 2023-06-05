import SideMenu from "./SideMenu";
import { Dispatch, SetStateAction } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
	createNewChat: () => void;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const OffCanvas = ({ createNewChat, open, setOpen }: Props) => {
	return (
		<div className={`relative duration-500 ease-in-out transition-all ${!open && "hidden"}`} role="dialog">
			<div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
			<div className="fixed inset-0 flex">
				<div className="relative flex w-full max-w-xs h-full z-10 flex-1 flex-col bg-gray-900 p-2 text-white">
					<div className="absolute right-0 top-0 -mr-12 pt-2">
						<button
							type="button"
							className="flex h-10 w-10 items-center justify-center focus:outline-none"
							onClick={() => setOpen(false)}
						>
							<XMarkIcon />
						</button>
					</div>
					<SideMenu createNewChat={createNewChat} />
				</div>
			</div>
		</div>
	);
};

export default OffCanvas;
