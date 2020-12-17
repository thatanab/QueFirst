const router = require("express").Router();
const { getRooms } = require("../controllers/room");
const {register, login, createUser} = require("../controllers/user"); 
const {upload} = require('../middleware/upload')

router.post("/register", register);
router.post("/login", login);
router.post("/", createUser);
router.post('/', upload.single('image'),createUser);

module.exports = router;