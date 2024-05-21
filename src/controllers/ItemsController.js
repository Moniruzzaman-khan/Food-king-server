const express = require('express')
exports.foodData= async (req,res)=>{
    try{
        res.send([global.food_items,global.food_category])
    }catch (e) {
        res.status(500).json({ status: "Failed", data: e.message });
    }
}