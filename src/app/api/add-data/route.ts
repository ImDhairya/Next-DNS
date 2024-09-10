import dbConnect from "@/app/utils/dbConnect";
import {NextRequest, NextResponse} from "next/server";
import DnsModel, {Model} from "@/model/Host";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    console.log("This workds");
    const {hostName, recordType} = await request.json();
    if (!hostName || !recordType) {
      return NextResponse.json(
        {
          success: false,
          message: "Hostname and record type are required",
        },
        {status: 400}
      );
    }

    const newRecord = await DnsModel.create({hostName, recordType});

    return NextResponse.json(
      {
        success: true,
        message: "Record added successfully",
        data: newRecord,
      },
      {status: 201}
    );
  } catch (error) {
    console.log(error, "Error connecting");
    return NextResponse.json(
      {
        message: "Error entering dns details",
      },
      {status: 500}
    );
  }
}
