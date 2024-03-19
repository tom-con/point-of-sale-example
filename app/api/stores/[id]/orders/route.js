const knex = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		user: 'tom',
		password: '1234',
		database: 'point_of_sale_db'
	}
});

export async function POST(request, { params }) {
	const { id } = params;
	const { amount, productId } = await request.json()

	try {
		const result = await knex('orders')
			.insert({
				amount: amount,
				product_id: productId,
				store_id: id,
				submitted_at: new Date().toISOString()
			})
			.returning('*')

		return Response.json({ data: result })
	} catch (e) {
		return new Response(e.detail || e.message, { status: 400 })
	}

}