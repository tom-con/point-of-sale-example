import { H1, P } from "@/app/components/design-system/typography";
import { TBody, TD, TH, Table } from "@/app/components/design-system/table";

import FulfillOrder from "@/app/components/fulfill-order";

const { API_URL } = process.env;


export default async function Orders({ params }) {
	const res = await fetch(`${API_URL}/api/businesses/${params.id}/orders?fulfilled=false`);
	const { data: orders } = await res.json();

	return (
		<div className="p-4 md:p-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<H1 text="Orders" />
					<P text="Your current orders information." />
				</div>
			</div>
			<div>
				<Table>
					<thead>
						<tr>
							<TH>Product Name</TH>
							<TH>Amount Requested</TH>
							<TH>Store</TH>
							<th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-0">
								<span className="sr-only">Order More</span>
							</th>
						</tr>
					</thead>
					<TBody>
						{orders.map((order) => (
							<tr key={order.id}>
								<TD>{order.name}</TD>
								<TD>{order.amount}</TD>
								<TD>{order.address}</TD>
								<td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium text-white sm:pr-0">
									<FulfillOrder businessId={params.id} orderId={order.id} />
								</td>
							</tr>
						))}
					</TBody>
				</Table>
			</div>
		</div>
	);
}

