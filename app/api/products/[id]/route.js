import knex from '@/app/database'

export async function GET(req, { params }) {
	const data = await knex('products').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { name, isPerishable, daysToPerish } = body;
	const data = await knex('products').where('id', params.id).update({
		name: name,
		is_perishable: isPerishable,
		days_to_perish: daysToPerish
	})
	return Response.json({ data })
}