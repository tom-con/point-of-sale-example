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
``
export async function GET() {
	const data = await knex('businesses').select('*')
	return Response.json({ data })
}

export async function POST(req) {
	const body = await req.json()
	const { name, email, phone, tpn } = body;
	const data = await knex('businesses').insert({
		name: name,
		email: email,
		phone: phone,
		tpn: tpn
	})
	return Response.json({ data })
}