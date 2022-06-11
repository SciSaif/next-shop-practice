import React from "react";
import {getProduct, getProducts} from "../../lib/products";
import {ApiError} from "../../lib/api";
import Image from "next/Image";
import Page from "../../components/Page";
import {useUser} from "../../hooks/user";

export async function getStaticPaths() {
	const products = await getProducts();
	return {
		paths: products.map((product) => ({
			params: {id: product.id.toString()},
		})),
		fallback: "blocking",
	};
}

export async function getStaticProps({params: {id}}) {
	try {
		const product = await getProduct(id);
		return {
			props: {product},
			revalidate: parseInt(process.env.REVALIDATE_SECONDS), // 5 minutes
		};
	} catch (error) {
		if (error instanceof ApiError && error.status === 404) {
			return {notFound: true};
		}
		throw error;
	}
}

function ProductPage({product}) {
	return (
		<Page title={product.title}>
			<div className="flex flex-col lg:flex-row">
				<div>
					<Image src={product.pictureUrl} alt="" width={640} height={480} />
				</div>

				<div className="flex-1 lg:ml-4">
					<p className="text">{product.description}</p>
					<p className="text-lg font-bold">{product.price}</p>
				</div>
			</div>
		</Page>
	);
}

export default ProductPage;
