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