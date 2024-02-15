import React from "react";
import { Modal } from "../../components/modal";
import { InputField } from "../../components/input/InputField";

const pricePerKiloGram = 5; //price in euro
const calculatePrice = (weight: number): number => {
  const price = ((weight / 1000) * pricePerKiloGram).toFixed(3);
  return Number(price);
};
const roastOptions = [
  { value: "1", label: "1 - Extra Light" },
  { value: "2", label: "2 - Light" },
  { value: "3", label: "3 - Medium" },
  { value: "4", label: "4 - Dark" },
  { value: "5", label: "5 - Extra Dark" },
];

interface FormModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  drinkFlavor: string;
  setDrinkFlavor: React.Dispatch<React.SetStateAction<string>>;
  weight: number | "";
  setWeight: React.Dispatch<React.SetStateAction<number | "">>;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}
export const FormModal: React.FunctionComponent<FormModalProps> = ({
  isOpen,
  setIsOpen,
  handleSave,
  drinkFlavor,
  setDrinkFlavor,
  weight,
  setWeight,
  selectedOption,
  setSelectedOption,
}) => {
  const disabled = drinkFlavor === "" || weight === "" || selectedOption === "";
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSave={handleSave}
      title="Add your favorite tea/coffee flavor"
      disabled={disabled}
    >
      <form>
        <InputField
          placeholder="Enter your coffee or tea flavor"
          inputLabelName="drink name"
          ariaLabel="drink name"
          label="Drink name"
          type="text"
          value={drinkFlavor}
          onChange={(e) => setDrinkFlavor(e.target.value)}
        />
        <InputField
          inputLabelName="weight"
          ariaLabel="package weight in gram"
          placeholder="Enter package weight in grams"
          label="Weight(grams)"
          type="number"
          value={weight === "" ? "" : weight.toString()}
          onChange={(e) => {
            const value = e.target.value;
            setWeight(value === "" ? "" : parseFloat(value));
          }}
        />
        <div>
          <b>
            Price per kg: {pricePerKiloGram}€
            {weight !== "" && (
              <span> | Total Price: {calculatePrice(weight)}€</span>
            )}
          </b>
        </div>
        <div className="roast-level">
          <label htmlFor="selectOption">Select roast level:</label>
          <select
            id="selectOption"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="select-field"
          >
            <option value="">Select...</option>
            {roastOptions.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
};
