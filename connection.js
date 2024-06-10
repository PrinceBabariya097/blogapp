import mongoose from "mongoose"
import { configDotenv } from "dotenv"
configDotenv()

export const mongodbConnection = async () => {
    mongoose.connect(`${process.env.MONGODBURI}blog`)
}