import {useQuery} from "react-query";
import {fetchJson} from "../lib/api";

export function useCart() {
	const query = useQuery(
		"cart",
		async () => {
			try {
				return await fetchJson("/api/cart");
			} catch (err) {
				console.log(err);
				return undefined;
			}
		},
		{
			staleTime: 30000, // data valid for 30 seconds
			cacheTime: Infinity, // when data should be removed from the cache to free up memory
			refetchOnWindowFocus: false,
		}
	);

	return query.data;
}
