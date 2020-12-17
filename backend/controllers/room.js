const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

//Get Room
const getRoom = async (req, res) => {
    try {
        const rooms = await db.Room.findAll();
        res.status(200).send(rooms);
    } catch (err) {
        res.status(500).send({ messages: err.message });
    }
}

//Get Room by ID
const getRoomById = async (req, res) => {
    try {
        const rooms = await db.Room.findOne({ where: { id: req.params.id } });
        res.status(200).send(rooms);
    } catch (err) {
        res.status(500).send({ messages: err.message });
    }
}

//Create Room
const createRoom = async (req, res) => {
    try {
        const file = req.file;
        console.log(file)
        console.log("jump")
        const { roomName, roomStatus } = req.body;
        cloudinary.uploader.upload(file.path, async (error, result) => {
            console.log(result);
            console.log('---------------');
            console.log(error);

            const newRoom = await db.Room.create({
                roomName,
                roomStatus,
                roomImage: result.secure_url
            });
            fs.unlinkSync(file.path);
            res.status(201).send({ message: "Room has been created" })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({message:err.message})
    }
};

//Delete Room
const deleteRoom = async (req, res) => {
    const roomTodo = await db.Room.findOne({ where: { id: req.params.id } });
    if (roomTodo && roomTodo.user_id === req.user.id) {
        await roomTodo.destroy();
        res.status(200).send({ message: "Already deleted" });
    } else {
        res.status(404).send({ message: "Not found" });
    }
    const roomId = req.params.id;
    await db.Room.destroy({ where: { id: roomId } });
    res.status(204).send();
};

const updateRoom = async (req, res) => {
    const roomTodo = await db.Room.findOne({ where: { id: req.params.id } });
    if (roomTodo && roomTodo.user_id === req.user.id) {
        await roomTodo.update({ task: req.body.task });
        res.status(200).send({ message: "Already updated" });
    } else {
        res.status(404).send({ message: "Not found" });
    }

    const roomId = req.params.id;
    const { roomStatus } = req.body;
    await db.Room.update({ roomStatus }, { where: { id: roomId } });
    res.status(200).send({ message: "updated" });

};


module.exports = {
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom,
    getRoomById
};
