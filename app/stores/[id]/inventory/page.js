import { H1, P } from "@/app/components/design-system/typography";

const { API_URL } = process.env;


export default async function Inventory({ params }) {
	const res = await fetch(`${API_URL}/api/stores/${params.id}/inventory`);
	const { data: inventory } = await res.json();

	return (
		<div>
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<H1 text="Inventory" />
					<P text="Your current product stock calculations." />
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					{/* <button
						type="button"
						className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Add user
					</button> */}
				</div>
			</div>
			<div>
				<table className="min-w-full divide-y divide-gray-300">
					<thead>
						<tr>
							<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-0">
								Product Name
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-200 sm:table-cell"
							>
								Amount In Stock
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
								<span className="sr-only">Order More</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{inventory.map((item) => (
							<tr key={item.product_id}>
								<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium bg-gray-900 text-white sm:pl-0">
									{item.name}
								</td>
								<td className="hidden whitespace-nowrap px-3 py-4 text-sm bg-gray-900 text-white sm:table-cell">
									{item.amount}
								</td>
								<td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium  bg-gray-900 text-white sm:pr-0">
									<a href="#" className="text-indigo-300 hover:text-indigo-500">
										Order More<span className="sr-only">, {item.name}</span>
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

