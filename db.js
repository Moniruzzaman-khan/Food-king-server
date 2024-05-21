const mongoose = require('mongoose');

const dbURL = "mongodb+srv://monir:1234@cluster0.k0me6n0.mongodb.net/Food-king?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(dbURL);

        console.log('DB is connected');

        // Access the 'food_items' and 'foodCategory' collections
        const db = mongoose.connection.db;
        const foodItemsCollection = db.collection("food_items");
        const foodCategoryCollection = db.collection("food_category");

        // Fetch all documents from the 'food_items' collection
        const foodItemsData = await foodItemsCollection.find({}).toArray();
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();

        // Store fetched data in global variables
        global.food_items = foodItemsData;
        global.food_category = foodCategoryData;

    } catch (err) {
        // Handle any errors
        console.error("Error connecting to the database or fetching data:", err);
    }
};

// Export the connectToMongoDB function
module.exports = mongoDB;
