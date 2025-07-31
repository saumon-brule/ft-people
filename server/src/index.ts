import { FtApp, AuthenticatedRequest } from "@saumon-brule/ft.js";
import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import cookieParser from "cookie-parser";

configDotenv({ quiet: true });

if (!process.env.FT_APP_UID || !process.env.FT_APP_SECRET) {
	console.error("Invalid FT_APP_UID or FT_APP_SECRET environment variables");
	process.exit(1);
}

const JWT_SECRET = process.env.JWT_TOKEN ?? "SECRET";

process.on("uncaughtException", ({ message }) => {
	console.error("Error: " + message);
});

const ftApp = new FtApp([{ uid: process.env.FT_APP_UID, secret: process.env.FT_APP_SECRET, redirectURI: "http://localhost:3000/api/auth/callback" }]);
const expressApp = express();

expressApp.use(cookieParser());

ftApp.events.on("userAdd", (user) => {
	console.log("bonjour");
	user.load().then(console.log);
});

const apiRouter = express.Router();

const users: any[] = [];

async function getAllUsers() {
	ftApp.httpClient.get("/v2/campus/9/users?filter[pool_year]=2024,2023")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		});
}

getAllUsers().then(() => {
	apiRouter.get("/randomUser", (req: Request, res: Response) => {
		const userJwt = req.cookies.ft_people_token;
		if (!userJwt) return res.sendStatus(403);
		try {

			const payload = jwt.verify(userJwt, JWT_SECRET);
		} catch (error) {
			if (error instanceof TokenExpiredError) return res.sendStatus(401);
			res.sendStatus(500);
			throw new Error("Unknown error");
		}
		res.json(users[Math.floor(users.length * Math.random())]);
	});

	apiRouter.get("/auth", ftApp.userManager.authenticate());

	apiRouter.get("/auth/callback",
		ftApp.userManager.callback({ errorPage: "/auth/error" }),
		(req: Request, res: Response) => {
			const user = (req as AuthenticatedRequest).user;
			if (!user) {
				res.redirect("/auth/error");
				throw new Error("Expected user not found");
			}
			const userJwt = jwt.sign({ id: user?.id }, JWT_SECRET, { expiresIn: "1h" });
			res.cookie("ft_people_token", userJwt, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: 1000 * 60 * 60
			});
			res.redirect("/");
		}
	);

	expressApp.use("/api", apiRouter);

	const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
	const hostname = process.env.HOSTNAME ?? "localhost";

	expressApp.listen(port, hostname, () => {
		console.log(`Server started on http://${hostname}:${port}`);
	});
});
