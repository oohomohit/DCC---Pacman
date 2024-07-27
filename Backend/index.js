import dotenv from "dotenv"
import { app } from './app.js'
import connectDB from "./connectDB.js";
// import cors from "cors";

dotenv.config({
    path: './.env'
})


// sainivks4321 Y12hd8JosGfFZ1Zc
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })

