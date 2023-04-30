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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
// import database from './database';
const app_1 = __importDefault(require("./app"));
const errors_1 = __importDefault(require("./utils/errors"));
const { PORT } = config_1.default;
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    // await database.databaseConnection();
    yield (0, app_1.default)(app);
    // app.get('/', (req, res) => res.send("hehekj"))
    (0, errors_1.default)(app);
    app
        .listen(PORT, () => {
        console.log(`Product Service listening to port ${PORT}`);
    })
        .on('error', (err) => {
        console.log(err);
        process.exit();
    });
});
StartServer();
