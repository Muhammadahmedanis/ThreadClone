import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { StatusCodes } from "http-status-codes";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

// Middleware Configurations
app.use(express.json({ limit: "16kb" }));   // to parse general data in req.body
app.use(express.urlencoded({ extended: true, limit: "16kb" }));  // to parse form data in req.body
app.use(express.static("public"));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());

// CORS configuration
const allowedOrigins = [process.env.ALLOWED_ORIGIN_1, process.env.ALLOWED_ORIGIN_1];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET, POST, PUT, DELETE", "PATCH"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to My Page")
})

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);


// Handle Undefined Routes
app.all("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export { app };