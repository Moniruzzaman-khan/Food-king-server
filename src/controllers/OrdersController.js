const Orders = require('../models/Orders')

exports.orderData = async (req, res) => {
    const { email, order_date, order_data } = req.body;

    // Insert the order_date at the beginning of the order_data array
    order_data.unshift({ Order_date: order_date });

    console.log("Received email:", email);

    try {
        // Check if the email already exists in the database
        let existingOrder = await Orders.findOne({ email });

        if (!existingOrder) {
            // If the email does not exist, create a new order
            console.log("Creating new order for email:", email);
            await Orders.create({
                email,
                order_data: [order_data]
            });
            res.json({ success: true });
        } else {
            // If the email exists, update the existing order
            console.log("Updating order for email:", email);
            await Orders.findOneAndUpdate(
                { email },
                { $push: { order_data: order_data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).send("Server Error");
    }
};



exports.myOrderData = async (req, res) => {
    try {
        console.log(req.body.email);
        let eId = await Orders.findOne({ 'email': req.body.email });
        res.json({ orderData: eId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}