import clientPromise from "../lib/mongodb"
import { redirect } from "next/navigation"

export default async function Page({params}) {
    const shorturl = (await params).shorturl
    const client = await clientPromise
    const db = client.db("linkify")
    const collection = db.collection("urls")

    let mall = await collection.findOne({shorturl:shorturl})
    if(mall){
        let address = mall.url.includes("http")?mall.url:`https://${mall.url}`
        redirect(address)
    }
    else{
        redirect(process.env.NEXT_PUBLIC_HOST)
    }
    return <div>My Post: {shorturl}</div>
  }