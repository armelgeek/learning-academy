import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import {  NextResponse } from "next/server";
export const POST = async (req) => {
    const rawBody = await req.text();
    const signature = headers().get("Stripe-Signature");

    let event

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
    );
    } catch (err) {
        return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
    }

    const session = event.data.object;
    const customerId = session?.metadata?.customerId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
        if (!customerId || !courseId) {
            return new NextResponse("Missing metadata", { status: 400 });
        }

        await db.purchase.create({
            data: {
                customerId,
                courseId,
            },
        });
    } else {
        return new NextResponse(`Unhandled event type: ${event.type}`, {
            status: 400,
        });
    }

    return new NextResponse("Success", { status: 200 });
};
