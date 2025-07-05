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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../models/model");
const config_1 = require("../config");
const userRouter = (0, express_1.default)();
userRouter.get('/', (req, res) => {
    res.json({
        message: "healthy server"
    });
});
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        const user = yield model_1.UserModel.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(200).json({
            message: "signed up successful!",
            user: user
        });
    }
    catch (e) {
        res.status(501).json({
            error: e
        });
    }
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield model_1.UserModel.findOne({
            email,
        });
        if (!user) {
            res.status(403).json({
                message: 'User not found'
            });
            return;
        }
        const decodedPassword = user.password ? yield bcrypt_1.default.compare(password, user.password) : false;
        if (decodedPassword) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id.toString()
            }, config_1.JWT_SECRET);
            res.status(200).json({
                message: "logged in!",
                token
            });
        }
        else {
            res.status(403).json({
                message: "Incorrect Credentials"
            });
        }
    }
    catch (e) {
        res.json({
            error: e
        });
    }
}));
exports.default = userRouter;
