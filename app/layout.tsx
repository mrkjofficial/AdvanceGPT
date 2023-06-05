import "./globals.css";
import { getServerSession } from "next-auth";
import Authentication from "@/pages/Authentication";
import ClientProvider from "@/components/ClientProvider";
import SessionProvider from "@/middlewares/SessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const metadata = {
	title: "AdvanceGPT",
	description: "Your Next Generation AI Chatbot!",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<body>
				<SessionProvider session={session}>
					{session ? <ClientProvider>{children}</ClientProvider> : <Authentication />}
				</SessionProvider>
			</body>
		</html>
	);
}
