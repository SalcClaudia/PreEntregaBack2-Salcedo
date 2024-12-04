import { connect } from 'mongoose';
import "dotenv/config";

export const initMongoDB = async () => {
try {
    await connect("mongodb://localhost:27017/")
} catch (error) {
    throw new Error (error)
}
}