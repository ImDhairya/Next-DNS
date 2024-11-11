import dbConnect from "@/app/utils/dbConnect";
import {DnsModel, UserModel} from "@/model/Host";
import {ObjectId} from "mongoose";
import {NextRequest, NextResponse} from "next/server";

// interface itemType {
//   id: ObjectId;
//   hostName: string;
//   recordType: string;
//   user: ObjectId;
//   createdAt: any;
//   updatedAt: any;
//   __v: number;
// }

export async function GET(request: NextRequest) {
  dbConnect();

  try {
    const dataFromDB = await UserModel.find({}).populate({
      path: "dnsList",
      model: DnsModel,
    });
    const data = dataFromDB[0].dnsList;

    // console.log(data);
    // console.log(dataFromDB[0].dnsList);

    // data?.map((item: any, index) => {
    //   console.log(item.hostName, item.recordType, item.createdAt, index);
    // });

    return NextResponse.json({
      data,
      message: "The user data with populated dns data ",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "There is some error in fetching user data ",
        success: false,
      },
      {status: 501}
    );
  }
}

