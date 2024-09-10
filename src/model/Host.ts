import mongoose, {Schema, Document} from "mongoose";

export interface Model extends Document {
  hostName: string;
  recordType: string;
}

const ModelSchema: Schema<Model> = new Schema({
  hostName: {
    type: String,
    required: [true, "HostName is requried"],
  },
  recordType: {
    type: String,
    required: [true, "The record type is required"],
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  dnsList?: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
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
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  dnsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DnsRecord",
    },
  ],
});

export const DnsModel =
  (mongoose.models.Model as mongoose.Model<Model>) ||
  mongoose.model<Model>("Model", ModelSchema);

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", UserSchema);
