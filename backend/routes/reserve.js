const passport = require("passport");
const { getReserve, createReserve, deleteReserve, changeReserveStatus, getReserveByRoom, getReserveByUser, updateReserve, cancelReserve } = require("../controllers/reserve");
const router = require("express").Router();

const auth = passport.authenticate("jwt-auth", { session: false });

router.post("/:roomId", auth, createReserve);
router.delete("/:id", auth, deleteReserve);
router.patch("/:id", auth, updateReserve);
router.get("/room", auth, getReserve);
router.get("/roombyfirm", auth, getReserveByRoom);
router.get("/roombyuser", auth, getReserveByUser);
router.patch('/cancel/:id', auth, cancelReserve);

module.exports = router;