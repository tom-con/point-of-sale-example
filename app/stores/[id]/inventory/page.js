import { H1, P } from "@/app/components/design-system/typography";
import { TD, TH } from "@/app/components/design-system/table";

import OrderForm from "@/app/components/order-form";

const { API_URL } = process.env;


export default async function Inventory({ params }) {
	const res = await fetch(`${API_URL}/api/stores/${params.id}/inventory`);
	const { data: inventory } = await res.json();

	return (
		<div className="p-4 md:p-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<H1 text="Inventory" />
					<P text="Your current product stock calculations." />
				</div>
			</div>
			<div>
				<table className="min-w-full divide-y divide-gray-300 px-4">
					<thead>
						<tr>
							<TH>Product Name</TH>
							<TH>Amount In Stock</TH>
							<th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-0">
								<span className="sr-only">Order More</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-black">
						{inventory.map((item) => (
							<tr key={item.product_id}>
								<TD>{item.name}</TD>
								<TD>{item.amount}</TD>
								<td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium text-white sm:pr-0">
									<OrderForm productId={item.product_id} storeId={params.id} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

