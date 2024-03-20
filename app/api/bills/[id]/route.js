const knex = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.PG_URL,
		port: process.env.PG_PORT,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		database: process.env.PG_DB
	}
})

const PAYMENT_METHODS = [`cc`, `mbob`, `cash`]
const TAX_RATE = 0.05

export async function GET(req, { params }) {
	const { id } = params;
	const result = await knex('bills').where('id', id).select('*')

	if (!result.length) return new Response(`Bill not found with id "${id}"`, { status: 404 })

	return Response.json({ data: result })
}

export async function PUT(req, { params }) {
	const { id } = params;
	const {
		paymentMethod,
		subtotal,
	} = await req.json()

	if (paymentMethod && !PAYMENT_METHODS.includes(paymentMethod)) {
		return new Response(`Bad Request: Payment method must be one of [${PAYMENT_METHODS.join(`, `)}]`, { status: 400 })
	}

	const taxToApply = subtotal * TAX_RATE

	const result = await knex('bills').where('id', id).update({
		payment_method: paymentMethod,
		subtotal: subtotal,
		total: subtotal + taxToApply,
		tax: taxToApply,
	}).returning('*')

	return Response.json({ data: result })
}