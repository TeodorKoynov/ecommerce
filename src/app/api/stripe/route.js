import {NextResponse} from "next/server";
import {Stripe} from "stripe";

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request) {
    const data = await request.json();
    const {cartItems} = data;
    // console.log('cartItems', cartItems)
    // console.log('Image', cartItems[0].image[0])

    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1NKURNLdLy1pLE3CZgWunnxv'},
            ],
            line_items: cartItems.map(item => {
                const img = item.image[0].asset._ref;
                const newImage = img
                    .replace('image-', 'https://cdn.sanity.io/images/xb78ummi/production/')
                    .replace('-webp', '.webp');

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [newImage],
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `http://localhost:3000?success=true`,
            cancel_url: `http://localhost:3000?canceled=true`,
        }

        const session = await stripe.checkout.sessions.create(params);

        return new NextResponse.json(session, {status: 200});
    } catch (error) {
        console.log("error", error)
        return new NextResponse(error, {
            status: 400,
        });
    }
}