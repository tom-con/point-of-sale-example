import crypto from 'crypto'
import knex from '@/app/database'

export async function POST(req) {
	const { username, password } = await req.json();

	const [foundUser] = await knex('users')
		.where('username', username)
		.select('*')

	const hash = crypto.pbkdf2Sync(password, foundUser.salt, 1000, 64, 'sha512').toString('hex')

	const isValidLogin = hash === foundUser.hashed_password

	if (isValidLogin) return Response.json({ data: "OK" })
	else return new Response("BAD LOGIN", { status: 403 })
}