import React from "react";
import "./Drink.scss";
import { Drinks } from "../../types";

interface DrinkListProps {
	data: Drinks[];
}

export const DrinkList: React.FunctionComponent<DrinkListProps> = ({
	data,
}) => {
	return (
		<div className="table-list-wrapper">
			{data.length > 0 && (
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Weight(gm)</th>
							<th>Roast Level</th>
						</tr>
					</thead>
					<tbody>
						{data.map((drink) => (
							<tr key={drink.id}>
								<td>{drink.name}</td>
								<td>{drink.weight}</td>
								<td>{drink.roastLevel}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};
