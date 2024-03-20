import OrderForm from "@/app/components/order-form";

const { API_URL } = process.env;


export default async function Inventory({ params }) {
	const res = await fetch(`${API_URL}/api/stores/${params.id}/inventory`);
	const { data: inventory } = await res.json();

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold mb-4">Inventory</h1>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{inventory.map((item) => (
					<li
						key={item.id}
						className="bg-white rounded-lg shadow-md p-4"
					>
						<h2 className="text-lg font-bold mb-2 text-black">{item.name}</h2>
						<p className="text-gray-500">{item.amount}</p>
						<OrderForm productId={item.product_id} storeId={params.id} />
					</li>
				))}
			</ul>
		</div>
	);
}
