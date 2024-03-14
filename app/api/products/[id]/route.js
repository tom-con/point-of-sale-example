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
	const data = await knex('products').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { name, isPerishable, daysToPerish } = body;
	const data = await knex('products').where('id', params.id).update({
		name: name,
		is_perishable: isPerishable,
		days_to_perish: daysToPerish
	})
	return Response.json({ data })
}