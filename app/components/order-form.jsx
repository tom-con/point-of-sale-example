"use client"

import Button from "@/app/components/button";
import { useState } from "react";

export default function OrderForm({ productId, storeId }) {
	const [amount, setAmount] = useState(10)
	const [loading, setLoading] = useState(false)

	async function orderProduct(productId, amount) {
		setLoading(true)
		const result = await fetch(`/api/stores/${storeId}/orders`, {
			method: `POST`,
			body: JSON.stringify({
				amount,
				productId,
			})
		})
		setLoading(false)
	}

	return (
		<div className="flex justify-end gap-4">
			<input
				className="border-2 border-black text-black w-20 rounded-md"
				min={1}
				onChange={(event) => setAmount(event.target.value)}
				type="number"
				value={amount}
			/>
			<Button loading={loading} onClick={() => { orderProduct(productId, amount) }} text="Order More" />
		</div>
	)
}