import express from "express";
import cors from "cors";
import httpContext from "express-http-context";
import "reflect-metadata";
import fileUpload from 'express-fileupload';


// Application imports
import router from "./routes/urls";
import logger from "./services/winstonLogging";
import { errorHandlingMiddleware, responseMiddleware, requestMiddleware } from "./middleware";
import mongoConnect from "./db/mongoConnection";

const app = express();
const PORT = process.env.PORT || 8008;

// body parser setup
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// express fileupload setup
app.use(fileUpload());

// Cors setup
app.use(cors());

// using httpcontext middleware
app.use(httpContext.middleware);

// public setup
app.use(express.static("public"));
app.use(express.static("storage/tmp"));

// Middleware
app.use(requestMiddleware);

app.use(responseMiddleware);

// Routes will always go here
app.use("/", router);

app.use(errorHandlingMiddleware);

//staring mongo connection
mongoConnect(() => {
    console.log("Mongo server connected");
});

// setting up loggers
const globalAny: any = global;
globalAny.logger = logger();

// exiting all the process before terminating the app
process.on("SIGINT", () => {
    process.exit(0);
});

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT} on ENV: ${process.env.NODE_ENV}`);
});

export default app;