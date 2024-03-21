import knex from '@/app/database'

export async function GET(req, { params }) {
	const data = await knex('stocks').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { amount, receivedDateTime } = body;
	const data = await knex('stocks').where('id', params.id).update({
		amount: amount,
		received_datetime: receivedDateTime,
	})
	return Response.json({ data })
}