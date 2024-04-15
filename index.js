const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post")
const app = express();
var cors = require('cors')

const PORT = 3001;
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174']
}));


connectToMongoDB("mongodb://localhost:27017/socialAppTask")
    .then(() => console.log("MongoBD Connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/posts", postRoute);


app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));