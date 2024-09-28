import dbConnect from "@/app/utils/dbConnect";
import {UserModel} from "@/model/Host";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  dbConnect();
  try {
    const id = await request.json();
    console.log(Object.values(id)[0], "Hellow Jis ");
    const idValue = Object.values(id)[0];
    const user = await UserModel.findOne({id: idValue});
    console.log(
      user,
      " This means the user is there if it is null then user not there "
    );
    if (user) {
      return NextResponse.json({
        message: "Successfully fetched data",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Not found user",
        success: false,
      });
    }
    // if (user == null) {
    //   return NextResponse.json({
    //     message: "NO user found",
    //     success: false,
    //   });
    // }
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
