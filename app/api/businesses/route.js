import knex from '@/app/database'

export async function GET() {
	const data = await knex('businesses').select('*')
	return Response.json({ data })
}

export async function POST(req) {
	const body = await req.json()
	const { name, email, phone, tpn } = body;
	const data = await knex('businesses').insert({
		name: name,
		email: email,
		phone: phone,
		tpn: tpn
	})
	return Response.json({ data })
}