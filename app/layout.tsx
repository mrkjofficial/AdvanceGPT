import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import Authentication from "@/pages/Authentication";
import SessionProvider from "@/middlewares/SessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Toast from "@/components/Toast";

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
					{session ? (
						<div className="app__container">
							<Toast />
							<aside className="sidebar__container">
								<Sidebar />
							</aside>
							<main className="main__container">{children}</main>
						</div>
					) : (
						<div className="authentication__container">
							<Authentication />
						</div>
					)}
				</SessionProvider>
			</body>
		</html>
	);
}
