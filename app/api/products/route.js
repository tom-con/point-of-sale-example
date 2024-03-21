import knex from '@/app/database'

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