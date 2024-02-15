import { useState } from "react";
import "./Home.scss";
import { InputField } from "../../components/input/InputField";
import { DrinkList } from "../favDrink";
import { Button } from "../../components/button";
import { useDrinks } from "../../hooks";
import { addDrink } from "../../services";
import { FormModal } from "./FormModal";
import { useDebounce } from "../../hooks/useDebounce";

export const Home: React.FunctionComponent = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const debounceSearch = useDebounce(searchTerm);
	const { data, loading, error, refetch } = useDrinks(debounceSearch);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [drinkFlavor, setDrinkFlavor] = useState<string>("");
	const [weight, setWeight] = useState<number | "">("");
	const [selectedOption, setSelectedOption] = useState<string>("");
	const handleSave = () => {
		const drink = {
			name: drinkFlavor,
			weight: weight as number,
			roastLevel: Number(selectedOption),
		};
		addDrink(drink)
			.then((response) => {
				if (response.status === 201) {
					setDrinkFlavor("");
					setWeight("");
					setSelectedOption("");
					refetch();
				}
			})
			.catch((error) => console.error(error));
	};
	return (
		<div>
			<div className="button-wrapper">
				<Button
					ariaLabel={"Click me to open form"}
					onClick={() => setIsOpen(true)}
				>
					<span className="plus-icon">&#43;</span>Add
				</Button>
			</div>
			<div className="search-input-wrapper">
				<InputField
					ariaLabel="search"
					inputLabelName="search"
					placeholder="search"
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			{error != null ? (
				<div className="fetch-info">Something went wrong</div>
			) : loading || data == null ? (
				<div className="fetch-info">Loading...</div>
			) : data.length === 0 ? (
				<div className="fetch-info">No drinks</div>
			) : (
				<DrinkList data={data} />
			)}
			<FormModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				handleSave={handleSave}
				drinkFlavor={drinkFlavor}
				setDrinkFlavor={setDrinkFlavor}
				weight={weight}
				setWeight={setWeight}
				selectedOption={selectedOption}
				setSelectedOption={setSelectedOption}
			/>
		</div>
	);
};
