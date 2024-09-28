import mongoose, {Schema, Document} from "mongoose";

export interface DNSModel extends Document {
  hostName: string;
  recordType: string;
  user: mongoose.Types.ObjectId;
}

const DNSSchema: Schema<DNSModel> = new Schema(
  {
    hostName: {
      type: String,
      required: [true, "HostName is requried"],
    },
    recordType: {
      type: String,
      required: [true, "The record type is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure that the DNS record is always associated with a user
    },
  },
  {timestamps: true}
);

export interface User extends Document {
  clerk_id: string;
  username: string;
  fullName: string;
  email: string;
  dnsList?: mongoose.Types.ObjectId[];
}
// emailAddresses[0].emailAddress
// primaryEmailAddress.emailAddress
const UserSchema: Schema<User> = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    clerk_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      match: [/.+\@.+\..+/, "please use a valid email "],
    },

    dnsList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DNSModel",
      },
    ],
  },
  {timestamps: true}
);

export const DnsModel =
  (mongoose.models.DNSModel as mongoose.Model<DNSModel>) ||
  mongoose.model("DNSModel", DNSSchema);

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", UserSchema);
