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
const model_1 = require("../models/model");
const contentRouter = (0, express_1.default)();
contentRouter.get('/all-content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const contents = yield model_1.ContentModel.find({
        userId
    });
    if (!contents) {
        res.json({
            message: "Not contents available"
        });
        return;
    }
    res.status(200).json({
        contents
    });
}));
contentRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type } = req.body;
    const userId = req.userId;
    try {
        const content = yield model_1.ContentModel.create({
            title,
            link,
            type,
            userId
        });
        if (!content) {
            res.status(404).json({
                message: 'No content found!'
            });
        }
        res.json({
            message: "created new brain",
            content: content,
        });
    }
    catch (e) {
        res.status(501).json({
            error: "Oops...couldn't creat post. Try again later"
        });
    }
}));
contentRouter.get('/:contentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const contentId = req.params.contentId;
    const contents = yield model_1.ContentModel.findById({
        _id: contentId.toString()
    });
    if (!contents) {
        res.json({
            message: "Not contents available"
        });
        return;
    }
    res.status(200).json({
        contents
    });
}));
contentRouter.delete('/remove/:contentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.contentId;
    const userId = req.userId;
    try {
        const content = yield model_1.ContentModel.findByIdAndDelete({
            _id: contentId,
        });
        console.log("content:");
        if (!content) {
            res.status(404).json({
                message: 'content not found!'
            });
        }
        res.json({
            message: "deleted!",
        });
    }
    catch (e) {
        res.status(501).json({
            error: "Oops...couldn't delete. Try again later"
        });
    }
}));
contentRouter.put('/update/:contentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.contentId;
    const { title, link, type } = req.body;
    const userId = req.userId;
    try {
        const content = yield model_1.ContentModel.findByIdAndUpdate(contentId, {
            link,
            title,
            type
        });
        console.log("updated content:");
        if (!content) {
            res.status(404).json({
                message: 'content not found!'
            });
        }
        res.json({
            message: "updated content!",
        });
    }
    catch (e) {
        res.status(501).json({
            error: "Oops...couldn't update. Try again later"
        });
    }
}));
exports.default = contentRouter;
