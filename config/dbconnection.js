const mongoose = require("mongoose");

const dbconnect = async () => {
    try {
        // localhost - databse name = productapi
        // await mongoose.connect("mongodb://localhost:27017/productapi");

        //bhoomikamahavar1796_db_user:<db_password>@cluster0.dsm7kcx.mongodb.net/productapi?appName=Cluster0");

        await mongoose.connect("mongodb+srv://bhoomikamahavar1796_db_user:BCMwDDA4r0S36jH6@cluster0.0kopu6i.mongodb.net/productapi?appName=Cluster0");

    } catch (error) {
        console.log(error);
        console.log("Could Not Connect to the Database");
        process.exit(1);
    }
}

module.exports = dbconnect;