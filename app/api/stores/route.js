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


// /api/stores
// /api/stores?business_id=2
export async function GET(request) {
	const searchParams = request.nextUrl.searchParams
	const businessId = searchParams.get('business_id')
	const data = await (businessId === null ? knex('stores').select('*') : knex('stores').where('business_id', businessId).select('*'))
	return Response.json({ data })
}

export async function POST(req) {
	const body = await req.json()
	const { address, phone, email, businessId } = body;
	const data = await knex('stores').insert({
		address: address,
		email: email,
		phone: phone,
		business_id: businessId
	})
	return Response.json({ data })
}