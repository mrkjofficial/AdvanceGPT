import NewChat from "@/components/NewChat";
import ChatInput from "@/components/ChatInput";

type Props = {
	params: {
		id: string;
	}
};

const ChatPage = ({params: { id }}: Props) => {
	return (
		<div className="flex flex-col h-screen w-full items-center justify-center">
			<NewChat chatId={id} />
			<ChatInput chatId={id} />
		</div>
	);
};

export default ChatPage;
