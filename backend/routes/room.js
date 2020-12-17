
// const passport = require("passport");
const { getRoom, createRoom, deleteRoom, updateRoom, getRoomById } = require("../controllers/room");
const router = require("express").Router();
const {upload} = require("../middleware/upload")

// const auth = passport.authenticate("jwt-auth", { session: false });

router.get("/", getRoom);
router.get("/:id", getRoomById);
router.post("/upload",upload.single("roomImage"), createRoom);
router.delete("/:id", deleteRoom);
router.patch("/:id", updateRoom);


module.exports = router;