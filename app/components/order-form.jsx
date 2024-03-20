"use client"

import Button from "@/app/components/button";
import { useState } from "react";

export default function OrderForm({ productId, storeId }) {
	const [amount, setAmount] = useState(10)

	async function orderProduct(productId, amount) {
		const result = await fetch(`/api/stores/${storeId}/orders`, {
			method: `POST`,
			body: JSON.stringify({
				amount,
				productId,
			})
		})
		console.log(result)
	}

	return (
		<div className="flex">
			<input
				className="border-2 border-black text-black w-1/2"
				min={1}
				onChange={(event) => setAmount(event.target.value)}
				type="number"
				value={amount}
			/>
			<Button onClick={() => { orderProduct(productId, amount) }} text="Order More" />
		</div>
	)
}