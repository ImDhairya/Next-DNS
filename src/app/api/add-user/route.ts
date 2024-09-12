import dbConnect from "@/app/utils/dbConnect";
import {UserModel} from "@/model/Host";
// import {UserModel} from "@/model/Host";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const {id, username, fullName, email} = await request.json();

    if (!email || !id || !username) {
      return NextResponse.json(
        {
          massage: "Please fill all the required fields",
        },
        {status: 500}
      );
    }

    const isUser = await UserModel.findOne({id});
    if (isUser) {
      return NextResponse.json(
        {
          massage: "User already exists just login",
        },
        {status: 200}
      );
    }

    // create new user

    await UserModel.create({id, username, fullName, email});

    return NextResponse.json({
      message: "User Added to db",
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
