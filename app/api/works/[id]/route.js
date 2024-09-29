import connectMongoDB from "@/libs/mongodb";
import Work from "@/models/work";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description, status } = await request.json();
  console.log(title, description, status);
  await connectMongoDB();
  await Work.findByIdAndUpdate(id, { title, description, status });
  return NextResponse.json({ message: "Work updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const work = await Work.findOne({ _id: id });
  return NextResponse.json({ work }, { status: 200 });
}