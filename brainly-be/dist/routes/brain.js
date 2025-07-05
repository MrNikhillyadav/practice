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
const nanoid_1 = require("nanoid");
const brainRouter = (0, express_1.default)();
brainRouter.post('/share', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const userId = req.userId;
    if (share) {
        try {
            const existingUser = yield model_1.LinkModel.findOne({
                userId
            });
            console.log('existingUser: ', existingUser);
            if (existingUser) {
                const existingHash = yield model_1.LinkModel.find({
                    hash: existingUser.hash
                });
                res.json({
                    existingHash
                });
                return;
            }
            const hash = (0, nanoid_1.nanoid)();
            const link = yield model_1.LinkModel.create({
                hash,
                userId,
            });
            console.log("link", link);
            if (!link) {
                res.json({
                    message: "Link not created!"
                });
                return;
            }
            res.json({
                link: link
            });
        }
        catch (e) {
            res.json({
                error: "error occured! try later"
            });
        }
    }
    else {
        yield model_1.LinkModel.deleteOne({
            userId
        });
        res.json({
            message: "hash removed!"
        });
    }
}));
brainRouter.get('/share/:sharelink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    try {
        const brainHash = yield model_1.LinkModel.findOne({
            hash
        });
        if (!brainHash) {
            res.json({
                message: "hash not found"
            });
        }
        const content = yield model_1.ContentModel.find({
            userId: brainHash === null || brainHash === void 0 ? void 0 : brainHash.userId
        });
        if (!content) {
            res.json({
                message: "content not found"
            });
            return;
        }
        res.json({
            content
        });
    }
    catch (e) {
        res.status(501).json({
            message: "link not working!"
        });
        return;
    }
}));
brainRouter.post('/share-by-id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId, share } = req.body;
    const userId = req.userId;
    if (share) {
        try {
            const content = yield model_1.ContentModel.findById({
                _id: contentId
            });
            console.log('content: ', content);
            const hash = (0, nanoid_1.nanoid)();
            const link = yield model_1.LinkModel.create({
                hash,
                userId,
                contentId: content === null || content === void 0 ? void 0 : content._id
            });
            console.log("link", link);
            if (!link) {
                res.json({
                    message: "Link not created!"
                });
                return;
            }
            res.json({
                link: link.hash
            });
        }
        catch (e) {
            res.json({
                error: "error occured"
            });
            return;
        }
    }
    else {
        yield model_1.LinkModel.findById({
            contentId
        });
        res.json({
            message: "hash removed for contentId"
        });
    }
}));
brainRouter.get('/share-by-id/:contentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.contentId;
    try {
        const brainHash = yield model_1.LinkModel.findOne({
            hash
        });
        if (!brainHash) {
            res.json({
                message: "hash not found"
            });
        }
        const content = yield model_1.ContentModel.findById({
            _id: brainHash === null || brainHash === void 0 ? void 0 : brainHash.contentId
        });
        if (!content) {
            res.json({
                message: "content not found"
            });
            return;
        }
        res.json({
            content
        });
    }
    catch (e) {
        res.status(501).json({
            message: "link not working!"
        });
        return;
    }
}));
exports.default = brainRouter;
