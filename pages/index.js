import ProductCard from "../components/ProductCard";
import {getProducts} from "../lib/products";
import Page from "../components/Page";

export async function getStaticProps() {
	const products = await getProducts();
	return {
		props: {
			products,
		},
		revalidate: parseInt(process.env.REVALIDATE_SECONDS), // 5 minutes
	};
}

function Home({products}) {
	return (
		<Page title="Indoor Plants">
			<ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{products.map((product) => (
					<li key={product.id}>
						<ProductCard product={product} />
					</li>
				))}
			</ul>
		</Page>
	);
}

export default Home;
