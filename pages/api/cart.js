const {CMS_URL} = process.env;
import {fetchJson} from "../../lib/api";

async function handleCart(req, res) {
	const {jwt} = req.cookies;

	if (!jwt) {
		res.status(401).end();
		return;
	}

	try {
		const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		res.status(200).json(
			cartItems.map((item) => ({
				id: item.id,
				product: {
					id: item.product.id,
					title: item.product.title,
					price: item.product.price,
				},
				quantity: item.quantity,
			}))
		);
	} catch (err) {
		res.status(401).end();
	}
}

export default handleCart;
