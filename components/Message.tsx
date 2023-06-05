import Image from "next/image";
import { DocumentData } from "firebase/firestore";

type props = {
	message: DocumentData;
};
const Message = ({ message }: props) => {
	const isGPT = message.user.name === "AdvanceGPT";
	return (
		<div className={`message__container ${isGPT && "bg-gray-50 dark:bg-gray-700"}`}>
			<div className="message__wrapper">
				<Image
					className="message__avatar"
					src={message.user.avatar}
					height={40}
					width={40}
					alt="avatar"
					priority
				/>
				<p className="message__text">{message.text}</p>
			</div>
		</div>
	);
};

export default Message;
