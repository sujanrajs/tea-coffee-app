import { Router } from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, "..", "..", "data", "drinks.json");

router.get("/", async (req, res) => {
	try {
		const searchTerm = req.query.search;
		const data = await fs.readFile(dataFilePath, "utf8");
		const drinks = JSON.parse(data);
		if (searchTerm != null) {
			const filteredDrinks = drinks.filter((drink) =>
				drink.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			res.status(200).json(filteredDrinks);
		} else {
			res.status(200).json(drinks);
		}
	} catch (e) {
		res.status(500).json(e);
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, weight, roastLevel } = req.body;
		if (name === "" || weight === "" || roastLevel === "") {
			res.status(400).json({ error: "Bad request" });
		}
		const data = await fs.readFile(dataFilePath, "utf8");
		const drinks = JSON.parse(data);
		const newDrink = {
			id: uuidv4(),
			...req.body,
		};
		drinks.push(newDrink);
		await fs.writeFile(dataFilePath, JSON.stringify(drinks, null, 2), "utf8");
		res.status(201).json(newDrink);
	} catch (e) {
		res.status(500).json(e);
	}
});

export default router;
