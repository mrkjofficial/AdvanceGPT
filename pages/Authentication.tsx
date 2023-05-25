"use client";
import Image from "next/image";
import { gptLogo } from "@/assets";
import { signIn } from "next-auth/react";

const Authentication = () => {
	return (
		<>
			<Image className="authentication__logo" src={gptLogo} alt="logo" width={300} height={300} priority/>
			<h4 className="authentication__welcome-message">Welcome to AdvanceGPT</h4>
			<h4 className="authentication__info-message">Log in / Sign up with your account to continue</h4>
			<div className="authentication__button-group">
				<button className="authentication__button" onClick={() => signIn("google")}>
					Log in
				</button>
				<button className="authentication__button" onClick={() => signIn()}>
					Sign up
				</button>
			</div>
		</>
	);
};

export default Authentication;
