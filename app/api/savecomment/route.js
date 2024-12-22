import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req){
    let body = await req.json()
    let client = await clientPromise
    let database = client.db("linkify")
    let collection = database.collection("comments")
    let result = await collection.insertOne({comment:body.comment})
    return NextResponse.json({ message: "Comment saved", result })
}