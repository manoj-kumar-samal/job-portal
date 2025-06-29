import express from "express"
import cookie from "cookie-parser"
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});

import userRouter from "./routers/user.route.js"
import companyRouter from "./routers/company.route.js";
import jobRouter from "./routers/job.route.js";
import applicationRouter from "./routers/application.route.js"

const app = express();
app.get("/", (req, res) => {
  res.send("Manoj")
})
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-xi-kohl.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// app.use(cors({
//   origin: "http://localhost:5173",
//   "job-portal-xi-kohl.vercel.app",
//   credentials: true, // ✅ MUST allow credentials
// }));

app.use("/api/v1/user", userRouter)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", applicationRouter)


connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})