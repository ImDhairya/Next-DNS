import dbConnect from "@/app/utils/dbConnect";
import {NextRequest, NextResponse} from "next/server";
import {DnsModel} from "@/model/Host";
import {UserModel} from "@/model/Host";
import {isValidDnsRecord} from "@/app/utils/validateDNSRecord";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const {hostName, recordType, clerk_id} = await request.json();
    if (!isValidDnsRecord(recordType)) {
      return NextResponse.json(
        {
          message: "This is not a valid record type",
        },
        {status: 500}
      );
    }
    console.log(hostName, recordType, clerk_id);
    if (!hostName || !recordType || !clerk_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Hostname and record type are required",
        },
        {status: 400}
      );
    }

    const user = await UserModel.findOne({clerk_id});
    console.log(user);
    // const user = await UserModel.findById(id).populate("dnsList");

    if (!user) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    // user object id to be matched with DNSSchema user
    const existingRecord = await DnsModel.findOne({
      user: user._id,
      hostName,
    });

    if (existingRecord) {
      console.log(
        "The hostname already exists cannot create same hostname twice"
      );
      return NextResponse.json(
        {
          message: "hostname Already exists change ",
        },
        {status: 500}
      );
    }
    const newRecord = await DnsModel.create({
      hostName,
      recordType,
      user: user._id,
    });

    // let ObjId = new mongoose.Types.ObjectId(newRecord.id);
    const ObjId = newRecord._id as mongoose.Types.ObjectId;
    user.dnsList?.push(ObjId);
    // user.dnsList.push(newRecord._id);
    await user.save();

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
