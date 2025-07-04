"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const model_1 = require("./models/model");
dotenv.config();
const PORT = process.env.PORT || 3000;
console.log('PORT: ', PORT);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
function ConnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb+srv://nikyadav20032003:e0u1Gam4rdA2ap6f@cluster0.orazjtw.mongodb.net/brain");
            console.log('db connected');
        }
        catch (e) {
            console.error("error", e);
            process.exit(1); // Exit if DB connection fails
        }
    });
}
app.get('/api/v1/', (req, res) => {
    res.json({
        message: "healthy server"
    });
});
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    console.log('hashedPassword: ', hashedPassword);
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
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield model_1.UserModel.findOne({
            email,
        });
        console.log("user", user);
        if (!user) {
            res.status(403).json({
                message: 'User not found'
            });
            return;
        }
        const decodedPassword = user.password ? yield bcrypt_1.default.compare(password, user.password) : false;
        console.log('decodedPassword: ', decodedPassword);
        if (decodedPassword) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id.toString()
            }, 'JWT_SECRET');
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
ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT} `);
    });
});
