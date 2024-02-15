import express from "express";
import cors from "cors";
import drinksRouter from "./routes/drinks.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/drinks", drinksRouter);
export const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log("server is running");
		});
	} catch (e) {
		console.error("Server error", e);
	}
};
