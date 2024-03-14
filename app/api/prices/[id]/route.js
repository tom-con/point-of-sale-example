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

export async function GET(req, { params }) {
	const data = await knex('prices').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { price, validFromDate } = body;
	const data = await knex('prices').where('id', params.id).update({
		price: price,
		valid_from_date: validFromDate,
	})
	return Response.json({ data })
}