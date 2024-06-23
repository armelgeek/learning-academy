import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {auth, redirectToSignIn} from "@clerk/nextjs/server";

export async function POST(
    req,
) {
    try {

        const { userId } = await auth();

        if(!userId) {
            redirectToSignIn()
        }

        const values = await req.json();

        const createProfile = await db.user.create({
            data : {
                id : userId,
                ...values
            }
        })

        return NextResponse.json(createProfile)



    } catch(error){
        return new NextResponse("Internal Server Error" , { status : 500})
    }
}


export async function GET(
    req,
) {
    try {

        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthorized" , { status : 401})
        }

        const user = await db.user.findUnique({
            where : {
                id : userId
            }
        })

        return NextResponse.json(user);

    } catch(error) {

        return new NextResponse("Internal Server Error" , { status : 500})
    }
}



export async function PATCH(
    req,
) {
    try {

        const { userId } = auth();

        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized" , { status : 401})
        }

        const patchedProfile = await db.user.update({
            where : {
                id : userId
            } , data : {
                ...values
            }
        })
        return NextResponse.json(patchedProfile);
    } catch(error) {
        return new NextResponse("Internal Server Error" , { status : 500})
    }
}
