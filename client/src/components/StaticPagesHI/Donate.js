import React from "react";

import donatebg from "./assets/donate-bg.png";
import iconSpacer from "./assets/icon-spacer.svg";
import iconSpacerBlue from "./assets/icon-spacer-blue.svg";
import { makeStyles } from "@material-ui/core";
import Footer from "../Footer";

const useStyles = makeStyles(() => ({
	outer: {
		background: "#fff",
	},
	main: {
		padding: "1.5rem 0;",
		maxWidth: "1200px",
		margin: "0 auto",
		"@media only screen and (min-width: 75em)": {
			padding: "1.5rem 2rem",
		},
	},
	title: {
		color: "#4d4d4d",
		textTransform: "uppercase",
		fontWeight: 500,
		textAlign: "center",
		background: "#FFF",
		margin: 0,
		padding: "32px 0",
	},
	btnContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	btnOutline: {
		color: "#fff",
		border: "1px solid #336699",
		background: "#336699",
		borderRadius: "6px",
		padding: "8px 16px",
		textDecoration: "none",
		textTransform: "uppercase",
	},
	btnBlue: {
		color: "#ffffff",
		background: "#336699",
		borderRadius: "6px",
		padding: "8px 16px",
		margin: ".5rem",
		textDecoration: "none",
		textTransform: "uppercase",
		"&:hover": {
			filter: "brightness(1.2)",
		},
	},
	btnWhite: {
		color: "#336699",
		background: "#ffffff",
		borderRadius: "6px",
		padding: "8px 16px",
		textDecoration: "none",
		textTransform: "uppercase",
		"&:hover": {
			filter: "brightness(1.2)",
		},
	},
	figure: {
		margin: 0,
		padding: 0,
	},
	icon: {
		margin: "auto",
	},
	donate: {
		padding: "32px",
		margin: "32px 0 0 0",
		borderRadius: "24px",
		color: "#4d4d4d",
		background: "#f0f0f0",
		display: "flex",
		flexDirection: "column",
		"& $h2": {
			color: "#336699",
			flexBasis: "100%",
			textTransform: "uppercase;",
			textAlign: "center",
			fontWeight: "500",
			fontSize: "32px",
			marginTop: "10px",
			marginBottom: "20px",
		},
		"& $btnOutline": {
			margin: "20px auto 0 auto",
		},
	},
	volunteerSection: {
		padding: "32px",
		margin: "32px 0 0 0",
		borderRadius: "24px",
		color: "#fff",
		background: "#336699",
		display: "flex",
		flexDirection: "column",
		"& $h2": {
			color: "#fff",
			flexBasis: "100%",
			textTransform: "uppercase;",
			textAlign: "center",
			fontWeight: "500",
			fontSize: "32px",
			marginTop: "10px",
			marginBottom: "20px",
		},
		"& $btnWhite": {
			margin: "20px auto 0 auto",
		},
	},
	cards: {
		display: "flex",
		flexDirection: "column",
		margin: "0 0 32px 0",
		alignItems: "center",
		"& $aside": {
			textAlign: "center",
			borderRadius: "24px",
			padding: "1.25rem",
			maxWidth: "550px",
			margin: "1rem 0",
			"& $btnWhite": {
				display: "inline-block",
				marginBottom: "20px",
			},
			"& $h3": {
				fontSize: "40px",
				fontWeight: "500",
				color: "#ffffff",
				margin: "20px 0",
			},
			"@media only screen and (min-width: 64em)": {
				marginLeft: "1rem",
				marginRight: "1rem",
			},
		},
		"@media only screen and (min-width: 64em)": {
			flexWrap: "nowrap",
			padding: "32px",
		},
	},
	signup: {
		background: "rgba(229, 113, 9, .7)",
		textAlign: "center",
	},
	volunteer: {
		background: "#e57109",
	},
}));
const Donate = () => {
	const classes = useStyles();
	// const { t } = useTranslation("donate");
	return (
		<div className={classes.outer}>
			<h1 className={classes.title}>Donate</h1>
			<div className={classes.main}>
				<figure className={classes.figure}>
					<img alt="Donate" src={donatebg} style={{ width: "100%" }} />
				</figure>
				<section className={classes.donate}>
					<img
						alt="Why Donate?"
						src={iconSpacerBlue}
						className={classes.icon}
						height="40"
					/>
					<h2>Help feed Hawaiʻi’s hungry.</h2>
					<p>
						Aloha Harvest is the largest nonprofit doing this work in the state
						of Hawaiʻi, acting as an essential collaborator with local food
						banks and social service agencies. In Hawaiʻi, 1 in 5 people rely on
						food pantries for assistance and yet 237,000 tons of good food is
						wasted annually. Since Aloha Harvest’s founding in 1999, we have
						rescued over 24 million pounds of quality food and gotten it into
						stomachs instead of landfills.
					</p>
					<p>
						Since Aloha Harvest’s founding in 1999, we have rescued over 24
						million pounds of quality food and gotten it into stomachs instead
						of landfills.
					</p>
					<p>
						Please visit Aloha Harvest's official website to learn how to help
					</p>
					<div className={classes.btnContainer}>
						<a
							href="https://alohaharvest.org/donate-food/"
							target="_blank"
							rel="noopener noreferrer"
							className={classes.btnBlue}
						>
							Food Donations
						</a>
						<a
							href="https://alohaharvest.org/donate-money/"
							target="_blank"
							rel="noopener noreferrer"
							className={classes.btnBlue}
						>
							Monetary Donations
						</a>
					</div>
				</section>
				<div className={classes.volunteerSection}>
					<img
						alt="Volunteer"
						src={iconSpacer}
						className={classes.icon}
						height="40"
					/>
					<h2>Be a Difference-Maker.</h2>
					<p>
						As a food rescue organization, we play a critical role alongside
						food banks and food pantries in the fight against hunger. And you
						can, too.
					</p>
					<p>
						Please visit Aloha Harvest's website to see current volunteer
						opportunities.
					</p>
					<a
						href="https://alohaharvest.galaxydigital.com/"
						target="_blank"
						rel="noopener noreferrer"
						className={classes.btnWhite}
					>
						Volunteer
					</a>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Donate;
