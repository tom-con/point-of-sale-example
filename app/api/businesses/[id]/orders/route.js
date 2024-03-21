import knex from '@/app/database'

export async function GET(request, { params }) {
	const { searchParams } = request.nextUrl
	const { id } = params
	const productId = searchParams.get('productId')
	const storeId = searchParams.get('storeId')
	const fulfilled = searchParams.get('fulfilled') === "true"

	var query = knex('orders')
		.join('stores', 'orders.store_id', '=', 'stores.id')
		.join('products', 'orders.product_id', '=', 'products.id')
		.where('stores.business_id', id)

	if (productId) query = query.where('product_id', productId) // knex('orders').where('product_id', productId)
	if (storeId) query = query.where('store_id', storeId) // knex('orders').where('product_id', productId).where('store_id', storeId) | knex('orders').where('store_id', storeId)
	if (fulfilled) query = query.whereNotNull('fulfilled_at')
	else query = query.whereNull('fulfilled_at')

	const results = await query.select('orders.*', 'products.name', 'stores.address')

	return Response.json({ data: results })
}