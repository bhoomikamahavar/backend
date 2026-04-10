const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const db = require("./config/dbconnection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const HOSTNAME = "0.0.0.0";
const PORT = 7777;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use( "/api/products", productRoutes );
app.use( "/api/users", userRoutes );

app.get( "/", (req, res) => {
    res.send("Hello Bhoomika")
    console.log("Hello Home Page");
} );

db().then( () => {
    console.log("Database Connected");
    app.listen( PORT, HOSTNAME, () => {
        console.log(`Server is running on http://${HOSTNAME}:${PORT}/`);
    } );
} );


