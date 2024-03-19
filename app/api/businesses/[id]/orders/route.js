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

export async function GET(request, { params }) {
	const { searchParams } = request.nextUrl
	const { id } = params
	const productId = searchParams.get('productId')
	const storeId = searchParams.get('storeId')
	const fulfilled = searchParams.get('fulfilled') === "true"

	var query = knex('orders')
		.join('stores', 'orders.store_id', '=', 'stores.id')
		.where('business_id', id)

	if (productId) query = query.where('product_id', productId) // knex('orders').where('product_id', productId)
	if (storeId) query = query.where('store_id', storeId) // knex('orders').where('product_id', productId).where('store_id', storeId) | knex('orders').where('store_id', storeId)
	if (fulfilled) query = query.whereNotNull('fulfilled_at')
	else query = query.whereNull('fulfilled_at')

	const results = await query.select('orders.*')

	return Response.json({ data: results })
}