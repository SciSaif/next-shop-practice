import Page from "../components/Page";
import React from "react";
import {useCart} from "../hooks/cart";

function CartTable({cartItems}) {
	return (
		<table>
			<thead>
				<tr>
					<th className="px-4 py-2">Product</th>
					<th className="px-4 py-2">Price</th>
					<th className="px-4 py-2">Quantity</th>
				</tr>
			</thead>
			<tbody>
				{cartItems.map((item) => (
					<tr key={item.id}>
						<td className="px-4 py-2">{item.product.title}</td>
						<td className="px-4 py-2 text-right">{item.product.price}</td>
						<td className="px-4 py-2 text-right">{item.quantity}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

function Cart() {
	const cartItems = useCart();

	return <Page title="Cart">{cartItems && <CartTable cartItems={cartItems} />}</Page>;
}

export default Cart;
