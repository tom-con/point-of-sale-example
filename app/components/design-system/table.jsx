export const TH = ({ children }) => {
	return (
		<th scope="col" className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
			{children}
		</th>
	)
}

export const TD = ({ children }) => {
	return (
		<td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-white sm:pl-0">
			{children}
		</td>
	)
}

export const TBody = ({ children }) => {
	return (
		<tbody className="divide-y divide-gray-200 bg-black">
			{children}
		</tbody>
	)
}

export const Table = ({ children }) => {
	return (
		<table className="min-w-full divide-y divide-gray-300 px-4">
			{children}
		</table>
	)
}