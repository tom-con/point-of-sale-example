import knex from '@/app/database'

export async function GET(req, { params }) {
	const data = await knex('users').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { salary, firstName, lastName } = body;
	const data = await knex('users').where('id', params.id).update({
		salary: salary,
		firstname: firstName,
		lastname: lastName
	})
	return Response.json({ data })
}