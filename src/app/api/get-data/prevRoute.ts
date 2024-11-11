import dbConnect from "@/app/utils/dbConnect";
import {DnsModel} from "@/model/Host";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  dbConnect();
  // await request.json();

  try {
    const data = await DnsModel.find({});
    if (data) {
      return NextResponse.json({
        message: "Successfully fetched data",
        data,
      });
    }
    return NextResponse.json(
      {
        message: "Error fetching data ",
      },
      {status: 502}
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error connecting to bd ",
        error,
      },
      {status: 501}
    );
  }
}
