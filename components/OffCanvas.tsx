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
		<div className={`off-canvas__container ${!open && "hidden"}`} role="dialog">
			<div className="off-canvas__open-bg"></div>
			<div className="off-canvas__wrapper">
				<div className="off-canvas__panel">
					<div className="off-canvas__close-button-container">
						<button type="button" className="off-canvas__close-button" onClick={() => setOpen(false)}>
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
