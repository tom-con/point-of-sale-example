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
	const productId = searchParams.get('product_id')
	const storeId = searchParams.get('store_id')
	var query = knex('stocks')
	if (productId) query = query.where('product_id', productId)
	if (storeId) query = query.where('store_id', storeId)
	const data = await query.select('*')
	return Response.json({ data })
}

export async function POST(req) {
	const body = await req.json()
	const { amount, productId, manufactureDate, receivedDateTime, storeId } = body;
	const data = await knex('stocks').insert({
		received_datetime: receivedDateTime,
		manufacture_date: manufactureDate,
		amount: amount,
		product_id: productId,
		store_id: storeId
	})
	return Response.json({ data })
}