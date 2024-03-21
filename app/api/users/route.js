import crypto from 'crypto'
import knex from '@/app/database'

// /api/stores
// /api/stores?business_id=2
export async function GET(request) {
	const searchParams = request.nextUrl.searchParams
	const storeId = searchParams.get('store_id')
	const data = await (storeId === null ? knex('users').select('*') : knex('users').where('business_id', businessId).select('*'))
	return Response.json({ data })
}

export async function POST(req) {
	const body = await req.json()
	const { firstName, salary, lastName, storeId, username, password } = body;
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
	const data = await knex('users').insert({
		firstname: firstName,
		lastname: lastName,
		salary: salary,
		store_id: storeId,
		username: username,
		salt: salt,
		hashed_password: hash
	}).returning('*')
	return Response.json({ data })
}