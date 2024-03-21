"use client"

import Button from "./button"
import { useState } from "react"

export default function FulfillOrder({ businessId, orderId }) {
	const [loading, setLoading] = useState(false)

	async function fulfillOrder() {
		setLoading(true)
		const result = await fetch(`/api/businesses/${businessId}/orders/${orderId}`, { method: `PUT` })
		setLoading(false)
	}

	return (
		<Button loading={loading} onClick={() => { fulfillOrder() }} text="Fulfill Order" />
	)
}