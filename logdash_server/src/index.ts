// Libs
// import "dotenv/config";
import express, { Express, Request, Response } from "express";
import KafkaConsumer from "./utils/kafkaConsumer.js";
import { messageProcessor } from "./utils/msgProcessor.js";

// Modules
import routes from "./routes/index.js";
// import errorHandler from "./utils/errorHandler"

// Setup
const app: Express = express();
const port = process.env.PORT || 3000;

// MiddleWare
// app.use(express.json());

// Routes
app.use(routes);

// Error Handler
// app.use(errorHandler);

// Setup Kafka consumer
new KafkaConsumer(
    messageProcessor,
    process.env.KAFKA_HOST as string,
    process.env.LOGDASH_KAFKA_CLIENT_ID as string,
    process.env.LOGDASH_KAFKA_GROUP_ID as string,
    [process.env.KAFKA_LOGDASH_TOPIC as string]
);

// Init Server
app.listen(port, () => {
    console.log("App is running on port " + port);
})