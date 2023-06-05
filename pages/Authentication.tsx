"use client";
import Image from "next/image";
import { gptLogo } from "@/assets";
import { signIn } from "next-auth/react";

const Authentication = () => {
	return (
		<div className="authentication__container">
			<Image className="authentication__logo" src={gptLogo} alt="logo" width={300} height={300} priority />
			<h4 className="authentication__welcome-message">Welcome to AdvanceGPT</h4>
			<h4 className="authentication__info-message">Log in with your google account to continue</h4>
			<button className="authentication__button" onClick={() => signIn("google")}>
				Log in
			</button>
		</div>
	);
};

export default Authentication;
