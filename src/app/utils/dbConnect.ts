import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODBURI! || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Db connected successfully ");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to DB");
    process.exit(1);
  }
}
export default dbConnect;
