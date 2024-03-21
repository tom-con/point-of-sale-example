import knex from '@/app/database'

export async function PUT(request, { params }) {
	const { orderId } = params

	const results = await knex.transaction(async (trx) => {
		const [order] = await trx('orders')
			.where('id', orderId)
			.update({
				fulfilled_at: new Date().toISOString()
			})
			.returning('*');


		const [stock] = await trx('stocks')
			.insert({
				product_id: order.product_id,
				store_id: order.store_id,
				amount: order.amount,
				received_datetime: order.fulfilled_at,
				manufacture_date: '2024-02-01',
			})
			.returning('*')

		return { order: order, stock: stock }
	})

	return Response.json({ data: results })
}