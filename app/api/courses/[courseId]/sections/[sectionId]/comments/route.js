import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";

export async function POST(
    req,
    { params }
) {
    try {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthorized" , { status : 401})
        }

        const { courseId , sectionId } = params;

        const values = await req.json();

        const comment = await db.comments.create({
            data : {
                userId,
                sectionId,
                ...values
            }
        })

        return NextResponse.json(comment)

    } catch(error){
       return new NextResponse("Internal Server Error" , { status : 500 })
    }
}
