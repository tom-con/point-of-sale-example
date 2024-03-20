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


export async function GET(request) {
	const searchParams = request.nextUrl.searchParams
	const productId = searchParams.get('product_id')
	const data = await (productId === null ? knex('prices').select('*') : knex('prices').where('product_id', productId).select('*'))
	return Response.json({ data })
}

export async function POST(req) {
	const body = await req.json()
	const { price, productId, storeId, validFromDate } = body;
	const data = await knex('prices').insert({
		valid_from_date: validFromDate,
		price: price,
		product_id: productId,
		store_id: storeId
	})
	return Response.json({ data })
}