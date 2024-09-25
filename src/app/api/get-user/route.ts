import dbConnect from "@/app/utils/dbConnect";
import {UserModel} from "@/model/Host";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  dbConnect();
  try {
    const id = await request.json();
    const user = await UserModel.findOne({id});
    console.log(user, "HALASLLAYUAAAAAAA");
    if (user) {
      return NextResponse.json({
        message: "Successfully fetched data",
        success: true,
      });
    }
    if (user == null) {
      return NextResponse.json({
        message: "NO user found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Errror sending user details",
      },
      {status: 500}
    );
  }
}
