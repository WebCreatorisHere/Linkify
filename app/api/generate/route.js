import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
export async function POST(req) {
   
    const body = await req.json()

    const client = await clientPromise;
    const db = client.db("linkify");
  const collection = db.collection("urls");

  //check if short url exists

  const doc = await collection.findOne({shorturl:body.shorturl})
  if(doc){
      return NextResponse.json({ success: false,error:true,message:'shorturl already exists!!' });
    }
    else{
        const result = await collection.insertOne({
            url:body.url,
            shorturl:body.shorturl
        })
        return NextResponse.json({ success: true,error:false,message:'URL generated successfully!' });
}
    
}

export async function DELETE(req) {
   
  const body = await req.json()

  const client = await clientPromise;
  const db = client.db("linkify");
const collection = db.collection("urls");

await collection.deleteOne({shorturl:body.shorturl})
return NextResponse.json({ success: true,error:false,message:'shorturl url deleted successfully!' })
  
}

export async function GET(req) {

    const client = await clientPromise;
    const db = client.db("linkify");
  const collection = db.collection("urls");

 let all = await collection.find({}).toArray((err, result) => {
    if (err) throw err;

    return result
  });
  
  return NextResponse.json(all)
    
}