import { axiosInstance } from "../config";
import { Drinks } from "../types";

type DrinksWithoutId = Omit<Drinks, "id">;
export const addDrink = async (drink: DrinksWithoutId) => {
	const { name, weight, roastLevel } = drink;
	try {
		const response = await axiosInstance.post("/drinks", {
			name,
			weight,
			roastLevel,
		});
		return response;
	} catch (error) {
		throw new Error();
	}
};
