import knex from '@/app/database'

export async function GET(req, { params }) {
	const data = await knex('stores').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { email, phone } = body;
	const data = await knex('stores').where('id', params.id).update({
		email: email,
		phone: phone
	})
	return Response.json({ data })
}