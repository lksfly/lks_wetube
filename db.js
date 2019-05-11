import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false

    }   //새로운 버전의 mongoose는 이런 식으로 configuration 을 보낼 수 있다. 
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log(`❌ error on DB Connection ${error}`)

db.once("open", handleOpen);
db.on("error", handleError);