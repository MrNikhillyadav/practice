"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.UserModel = exports.ContentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }
});
const contentType = new mongoose_2.Schema({
    title: String,
    link: String,
    type: String,
    userId: { type: mongoose_2.Schema.Types.ObjectId, ref: "User", required: true },
});
const LinkSchema = new mongoose_2.Schema({
    hash: String,
    contentId: { type: mongoose_2.Schema.Types.ObjectId, ref: "Content" },
    userId: { type: mongoose_2.Schema.Types.ObjectId, ref: "User", required: true }
});
exports.ContentModel = mongoose_1.default.model("Content", contentType);
exports.UserModel = mongoose_1.default.model("User", UserSchema);
exports.LinkModel = mongoose_1.default.model("Link", LinkSchema);
