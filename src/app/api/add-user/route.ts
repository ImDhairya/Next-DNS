import dbConnect from "@/app/utils/dbConnect";
// import {UserModel} from "@/model/Host";
import ClerkModel from "@/model/User";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const {clerkId, email} = await request.json();

    if (!email || !clerkId) {
      return NextResponse.json(
        {
          massage: "Please fill all the required fields",
        },
        {status: 500}
      );
    }

    const isUser = await ClerkModel.findOne({clerkId: clerkId});
    if (isUser) {
      return NextResponse.json(
        {
          massage: "User already exists just login",
        },
        {status: 200}
      );
    }

    const newUser = await ClerkModel.create({
      clerkId,
      email,
    });

    return NextResponse.json({
      message: "Added to db",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating the user",
        error,
      },
      {status: 501}
    );
  }
}
