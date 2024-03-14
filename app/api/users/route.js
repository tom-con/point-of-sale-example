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
	const storeId = searchParams.get('store_id')
	const data = await (storeId === null ? knex('users').select('*') : knex('users').where('business_id', businessId).select('*'))
	return Response.json({ data })
}

export async function POST(req) {
	const body = await req.json()
	const { firstName, salary, lastName, storeId } = body;
	const data = await knex('users').insert({
		firstname: firstName,
		lastname: lastName,
		salary: salary,
		store_id: storeId
	})
	return Response.json({ data })
}