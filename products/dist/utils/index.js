"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateSignature = exports.GenerateSalt = exports.ValidatePassword = exports.GeneratePassword = exports.ValidateSignature = exports.FormateData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const { APP_SECRET } = config_1.default;
//Utility functions
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.genSalt();
});
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = (inputPasswd, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(inputPasswd, salt);
});
exports.GeneratePassword = GeneratePassword;
const ValidatePassword = ({ inputPasswd, password, salt, }) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield GeneratePassword(inputPasswd, salt)) === password;
});
exports.ValidatePassword = ValidatePassword;
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, APP_SECRET, { expiresIn: '1d' });
});
exports.GenerateSignature = GenerateSignature;
const ValidateSignature = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.get('Authorization');
    if (!signature)
        return false;
    try {
        const payload = jsonwebtoken_1.default.verify(signature.split(' ')[1], APP_SECRET);
        req.user = payload;
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.ValidateSignature = ValidateSignature;
const FormateData = (data) => {
    if (data) {
        return { data };
    }
    else {
        throw new Error('Data Not found!');
    }
};
exports.FormateData = FormateData;
//Message Broker
// const getChannel = async () => {
//   if (amqplibConnection === null) {
//     amqplibConnection = await amqplib.connect(MSG_QUEUE_URL);
//   }
//   return await amqplibConnection.createChannel();
// };
// module.exports.CreateChannel = async () => {
//   try {
//     const channel = await getChannel();
//     await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
//     return channel;
//   } catch (err) {
//     throw err;
//   }
// };
// module.exports.PublishMessage = (channel, service, msg) => {
//   channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
//   console.log("Sent: ", msg);
// };
// module.exports.SubscribeMessage = async (channel, service) => {
//   await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
//   const q = await channel.assertQueue("", { exclusive: true });
//   console.log(` Waiting for messages in queue: ${q.queue}`);
//   channel.bindQueue(q.queue, EXCHANGE_NAME, SHOPPING_SERVICE);
//   channel.consume(
//     q.queue,
//     (msg) => {
//       if (msg.content) {
//         console.log("the message is:", msg.content.toString());
//         service.SubscribeEvents(msg.content.toString());
//       }
//       console.log("[X] received");
//     },
//     {
//       noAck: true,
//     }
//   );
// };
// const requestData = async (RPC_QUEUE_NAME, requestPayload, uuid) => {
//   try {
//     const channel = await getChannel();
//     const q = await channel.assertQueue("", { exclusive: true });
//     channel.sendToQueue(
//       RPC_QUEUE_NAME,
//       Buffer.from(JSON.stringify(requestPayload)),
//       {
//         replyTo: q.queue,
//         correlationId: uuid,
//       }
//     );
//     return new Promise((resolve, reject) => {
//       // timeout n
//       const timeout = setTimeout(() => {
//         channel.close();
//         resolve("API could not fullfil the request!");
//       }, 8000);
//       channel.consume(
//         q.queue,
//         (msg) => {
//           if (msg.properties.correlationId == uuid) {
//             resolve(JSON.parse(msg.content.toString()));
//             clearTimeout(timeout);
//           } else {
//             reject("data Not found!");
//           }
//         },
//         {
//           noAck: true,
//         }
//       );
//     });
//   } catch (error) {
//     console.log(error);
//     return "error";
//   }
// };
// module.exports.RPCRequest = async (RPC_QUEUE_NAME, requestPayload) => {
//   const uuid = uuid4(); // correlationId
//   return await requestData(RPC_QUEUE_NAME, requestPayload, uuid);
// };
