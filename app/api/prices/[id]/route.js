import knex from '@/app/database'

export async function GET(req, { params }) {
	const data = await knex('prices').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { price, validFromDate } = body;
	const data = await knex('prices').where('id', params.id).update({
		price: price,
		valid_from_date: validFromDate,
	})
	return Response.json({ data })
}