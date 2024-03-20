const knex = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.PG_URL,
		port: process.env.PG_PORT,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		database: process.env.PG_DB
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