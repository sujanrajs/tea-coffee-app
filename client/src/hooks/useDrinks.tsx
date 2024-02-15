import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../config";
import { Drinks } from "../types";

export const useDrinks = (searchTerm: string) => {
	const [data, setData] = useState<Drinks[] | null>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			let url = "/drinks";
			if (searchTerm) {
				url += `?search=${encodeURIComponent(searchTerm)}`;
			}
			const response = await axiosInstance.get(url);
			setData(response.data);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	}, [searchTerm]);
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
};
