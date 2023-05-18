import { BoltIcon, ExclamationTriangleIcon, SunIcon } from "@heroicons/react/24/outline";

const Home = () => {
	return (
		<>
			<h1 className="home__heading">AdvanceGPT</h1>
			<div className="home__info-container">
				<div className="home__info-wrapper">
					<div className="home__info">
						<SunIcon className="home__info-icon" />
						<h2>Examples</h2>
					</div>
					<div className="home__info-group">
						<button className="home__info-button">{`"Explain quantum computing in simple terms" →`}</button>
						<button className="home__info-button">{`"Got any creative ideas for a 10 year old's birthday?" →`}</button>
						<button className="home__info-button">{`"How do I make an HTTP request in Javascript?" →`}</button>
					</div>
				</div>
				<div className="home__info-wrapper">
					<div className="home__info">
						<BoltIcon className="home__info-icon" />
						<h2>Capabilities</h2>
					</div>
					<div className="home__info-group">
						<p className="home__info-text">{`Remembers what user said earlier in the conversation`}</p>
						<p className="home__info-text">{`Allows user to provide follow-up corrections`}</p>
						<p className="home__info-text">{`Trained to decline inappropriate requests`}</p>
					</div>
				</div>
				<div className="home__info-wrapper">
					<div className="home__info">
						<ExclamationTriangleIcon className="home__info-icon" />
						<h2>Limitations</h2>
					</div>
					<div className="home__info-group">
						<p className="home__info-text">{`May occasionally generate incorrect information`}</p>
						<p className="home__info-text">{`May occasionally produce harmful instructions or biased content`}</p>
						<p className="home__info-text">{`Limited knowledge of world and events after 2021`}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
