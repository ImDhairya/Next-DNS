// models/User.ts
import mongoose, {Schema, Document, MongooseQueryMiddleware} from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email: string;
}

const ClearkSchema: Schema<IUser> = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const ClerkModel =
  (mongoose.models.Clerk as mongoose.Model<IUser>) ||
  mongoose.model("Clerk", ClearkSchema);

export default ClerkModel;
