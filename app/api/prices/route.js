import knex from '@/app/database'

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