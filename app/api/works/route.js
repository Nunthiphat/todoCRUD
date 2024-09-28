import connectMongoDB from "@/libs/mongodb";
import Work from "@/models/work";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, description } = await request.json();
    await connectMongoDB();
    await Work.create({title, description});
    return NextResponse.json({ message: "Work Created" }, { status: 201 } );
}

export async function GET() {
    await connectMongoDB();
    const works = await Work.find();
    return NextResponse.json({ works });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Work.findByIdAndDelete(id);
    return NextResponse.json({ message: "Work deleted" }, { status: 200 });
}