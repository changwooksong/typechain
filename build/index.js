"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as cypto from "crypto";
const crypto_1 = __importDefault(require("crypto"));
class Block {
    constructor(preHash, height, data) {
        this.preHash = preHash;
        this.height = height;
        this.data = data;
        this.hash = Block.calculateHash(preHash, height, data);
    }
    static calculateHash(preHash, height, data) {
        const toHash = `${preHash}${height}}${data}`;
        return crypto_1.default.createHash("sha256").update(toHash).digest("hex");
    }
}
class Blockchain {
    constructor() {
        this.blocks = [];
    }
    getPrevHash() {
        if (this.blocks.length === 0)
            return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    addBlock(data) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    getBlocks() {
        return [...this.blocks];
    }
}
const blockchain = new Blockchain();
blockchain.addBlock("First one");
blockchain.addBlock("Second two");
blockchain.addBlock("Third three");
blockchain.addBlock("Fourth four");
console.log(blockchain.getBlocks());
