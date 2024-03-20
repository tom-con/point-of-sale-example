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

export async function GET(req) {
	const searchParams = req.nextUrl.searchParams;
	const storeId = searchParams.get("store_id")
	var query = knex('bills')
	if (storeId) query = query.where('store_id', storeId)
	var result = await query.select('*')
	return Response.json({ data: result })
}

export async function POST(req) {
	const {
		paymentMethod,
		subtotal,
		storeId,
	} = await req.json()

	if (!PAYMENT_METHODS.includes(paymentMethod)) {
		return new Response(`Bad Request: Payment method must be one of [${PAYMENT_METHODS.join(`, `)}]`, { status: 400 })
	}

	const taxToApply = subtotal * TAX_RATE

	const result = await knex('bills').insert({
		payment_method: paymentMethod,
		subtotal: subtotal,
		paid_at: (new Date().toISOString()),
		total: subtotal + taxToApply,
		tax: taxToApply,
		store_id: storeId
	}).returning('*')

	return Response.json({ data: result })
}