const knex = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		user: 'tom',
		password: '1234',
		database: 'point_of_sale_db'
	}
})

const TAX_RATE = 0.05

export async function POST(req) {
	const { storeId, billItems, paymentMethod } = await req.json()
	const productIds = billItems.map((billItem) => billItem.productId)
	const productsAndPrices = await knex('products')
		.join('prices', 'products.id', '=', 'prices.product_id')
		.whereIn('products.id', productIds)
		.where('prices.valid_from_date', '<', new Date().toISOString())
		.where('prices.store_id', storeId)
	// console.log(productsAndPrices)



	const billItemsToCreate = billItems.map(billItem => {
		const { amount, productId } = billItem
		const foundProductAndPrice = productsAndPrices.find(productAndPrice => {
			return productId === productAndPrice.product_id
		})
		return {
			product_id: productId,
			amount: amount,
			price_id: foundProductAndPrice.id,
			price: foundProductAndPrice.price
		}
	})

	const subtotal = billItemsToCreate.reduce((acc, billItemToCreate) => {
		return acc + (billItemToCreate.amount * billItemToCreate.price)
	}, 0)

	const taxToApply = subtotal * TAX_RATE

	const billToCreate = {
		payment_method: paymentMethod,
		subtotal: subtotal,
		paid_at: (new Date().toISOString()),
		total: subtotal + taxToApply,
		tax: taxToApply,
		store_id: storeId
	}

	const [createdBill] = await knex('bills').insert(billToCreate).returning('*')
	const billItemsToCreateAgain = billItemsToCreate.map(bITC => {
		bITC.bill_id = createdBill.id
		delete bITC.price
		return bITC
	})

	const createdBillItems = await knex('bill_items').insert(billItemsToCreateAgain).returning('*')

	createdBill.billItems = createdBillItems

	return Response.json({ data: createdBill })

}