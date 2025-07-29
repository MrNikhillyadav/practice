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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = require("./model/model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://nikyadav20032003:e0u1Gam4rdA2ap6f@cluster0.orazjtw.mongodb.net/demo")
    .then(() => console.log("db connected!"))
    .catch(() => console.log("error connecting to db"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/health', (req, res) => {
    res.json({
        message: "healthy"
    });
});
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, 5);
    console.log('hashPassword: ', hashPassword);
    //enter to db
    const user = yield model_1.UserModel.create({
        email,
        password: hashPassword
    });
    res.json({
        message: "signed up"
    });
}));
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield model_1.UserModel.findOne({
        email,
    });
    if (!user) {
        res.json({
            message: "user not found"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user === null || user === void 0 ? void 0 : user._id.toString()
    }, 'JWT_SECRET');
    res.json({
        message: "signed in",
        token: token
    });
}));
app.post('/dashboard', (req, res) => {
    res.json({
        message: "signed in"
    });
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
exports.default = app;
