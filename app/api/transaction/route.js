import knex from '@/app/database'

const TAX_RATE = 0.05

export async function POST(req) {
	const { storeId, billItems, paymentMethod } = await req.json()
	const productIds = billItems.map((billItem) => billItem.productId)
	const productsAndPrices = await knex('products')
		.join('prices', 'products.id', '=', 'prices.product_id')
		.whereIn('products.id', productIds)
		.where('prices.valid_from_date', '<', new Date().toISOString())
		.where('prices.store_id', storeId)
		.select('*')

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

	const results = await knex.transaction(async (trx) => {
		const [createdBill] = await trx('bills').insert(billToCreate).returning('*')
		const billItemsToCreateAgain = billItemsToCreate.map(bITC => {
			bITC.bill_id = createdBill.id
			delete bITC.price
			return bITC
		})

		const createdBillItems = await trx('bill_items').insert(billItemsToCreateAgain).returning('*')

		const stockUpdates = await Promise.all(createdBillItems.map(async (createdBillItem) => {
			const stocksWithAmount = await trx('stocks')
				.where('product_id', createdBillItem.product_id)
				.where('store_id', createdBill.store_id)
				.where('amount', '>', 0)
				.orderBy('received_datetime', 'asc')
				.select('*')


			let amountRemaining = createdBillItem.amount;

			for (let i = 0; i < stocksWithAmount.length; i += 1) {
				const { amount, id } = stocksWithAmount[i];
				let newAmount = 0;
				if (amount >= amountRemaining) {
					newAmount = amount - amountRemaining;
					amountRemaining = 0;
				} else {
					amountRemaining -= amount
				}
				const updatedStock = await trx('stocks')
					.where('id', id)
					.update({
						amount: newAmount
					})
			}
			return true;
		}))

		createdBill.billItems = createdBillItems

		return createdBill
	})


	return Response.json({ data: results })

}