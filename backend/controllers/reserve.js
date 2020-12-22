const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Get Reserve
const getReserve = async (req, res) => {
    try {
        const reserves = await db.Reserve.findAll();
        res.status(200).send({ reserves });
    } catch (err) {
        res.status(500).send({ messages: err.message });
    }
}

//Create Reserve
const createReserve = async (req, res) => {
    try {
        //const { date, time, reserveStatus } = req.body;
        const { date, reserveStatus } = req.body;
        const { roomId } = req.params;
        console.log('kkkkl', roomId)
        const targetRoom = await db.Room.findOne({ where: { id: roomId } })

        if (targetRoom) {
            const newReserve = await db.Reserve.create({
                date,
                //time,
                reserveStatus: "CONFIRM",
                userId: req.user.id,
                roomId
                // promotionId: req.promotion.id

            });

            await targetRoom.update({
                roomStatus: "Already reserved"
            })

            let { roomName } = await db.Room.findOne({ where: { id: Number(newReserve.roomId) } })

            res.status(201).send({ roomName });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ messages: err.message });
    }
};

//Delete Reserve

const deleteReserve = async (req, res) => {
    const reserveId = req.params.id;
    await db.Reserve.destroy({ where: { id: reserveId, userId: req.user.id } });
    res.status(204).send();
};

const cancelReserve = async (req, res, next) => {
    try {
        const { id } = req.params
        const reserve = await db.Reserve.findOne({
            where: {
                userId: req.user.id,
                roomId: id,
                reserveStatus: 'CONFIRM'
            }
        })

        if (!reserve) return res.status(400).send({ message: 'this reserve not found by this user' });

        const room = await db.Room.findOne({ where: { id } })

        if (!room) return res.status(400).send({ message: 'room not found' });

        await reserve.destroy();
        room.roomStatus = 'Available';
        await room.save()
        res.status(200).send({ message: 'Cancel success' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
};


const updateReserve = async (req, res) => {
    try {
        const reserveId = req.params.id;
        // const { date, time, reserveStatus, note } = req.body;
        const { date, reserveStatus, note } = req.body;
        const targetRoom = await db.Reserve.findOne({ where: { id: reserveId } })
        if (targetRoom) {
            await targetRoom.update({
                date,
                //time,
                reserveStatus: "CONFIRM",
                userId: req.user.id,
                reserveId
            });
            res.status(201).send();
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const getReserveByRoom = async (req, res) => {
    try {
        const targetReserve = await db.Reserve.findAll({
            where: { userId: req.user.id },
            include: {
                model: db.Room,
                attributes: ["id"]
            }
        });

        if (targetReserve) {
            res.status(200).send(targetReserve);
        } else {
            res.status(404).send({ message: "Target not found!!!" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

};

const getReserveByUser = async (req, res) => {
    try {
        const targetReserve = await db.Reserve.findAll({
            where: { userId: req.user.id },
            include: {
                model: db.Room,
                attributes: ["id"]
            }
        });

        if (targetReserve) {
            res.status(200).send(targetReserve);
        } else {
            res.status(404).send({ message: "Target not found!!!" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message });
    }


};


module.exports = {
    getReserve,
    createReserve,
    deleteReserve,
    updateReserve,
    getReserveByRoom,
    getReserveByUser,
    cancelReserve
};
