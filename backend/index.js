require("dotenv").config();
const express = require("express");
const app = express();
const db = require('./models');
const cors = require("cors");

require('./config/passport');

const roomRoutes = require("./routes/room");
const userRoutes = require("./routes/user");
const reserveRoutes = require("./routes/reserve");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/reserves", reserveRoutes);

app.use((req, res, next) => {
   res.status(404).send({ message: 'path not found' });
})

app.listen(process.env.PORT, () => {
   console.log(`Server is running at PORT ${process.env.PORT} `);
});

app.use((err, req, res, next) => {
   console.log(err);
   res.status(500).json({ message: err.message });
});

db.sequelize.sync({ force: false }).then(() => {
   console.log("Database connected.");
}).catch(err => {
   console.log(err);
});