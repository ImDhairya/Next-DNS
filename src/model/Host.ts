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

const DnsModel =
  (mongoose.models.Model as mongoose.Model<Model>) ||
  mongoose.model<Model>("Model", ModelSchema);

export default DnsModel;
