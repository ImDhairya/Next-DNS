import dbConnect from "@/app/utils/dbConnect";
import {UserModel} from "@/model/Host";
import {DnsModel} from "@/model/Host";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const {clerk_id, username, fullName, email} = await request.json();
    console.log(clerk_id, username, fullName, email, "GGGGGAAAAAAAYYYYYY");

    if (!email || !clerk_id || !username) {
      return NextResponse.json(
        {
          // message: "Please fill all the required fields",
          message: "Please fill all the required fields",
        },
        {status: 400}
      );
    }

    const isUser = await UserModel.findOne({email});
    console.log("Found similar user or not found", isUser);
    if (isUser) {
      return NextResponse.json(
        {
          massage: "User already exists just login",
        },
        {status: 409}
      );
    }

    // create new user

    await UserModel.create({clerk_id, username, fullName, email});

    return NextResponse.json(
      {
        message: "User Added to db",
      },
      {status: 201}
    );
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
