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


export async function GET(request) {
	const searchParams = request.nextUrl.searchParams
	const businessId = searchParams.get('business_id')
	const data = await (businessId === null ? knex('products').select('*') : knex('products').where('business_id', businessId).select('*'))
	return Response.json({ data })
}

export async function POST(req) {
	const body = await req.json()
	const { name, isPerishable, barcode, daysToPerish, businessId } = body;
	const data = await knex('products').insert({
		name: name,
		barcode: barcode,
		is_perishable: isPerishable,
		days_to_perish: daysToPerish,
		business_id: businessId
	})
	return Response.json({ data })
}