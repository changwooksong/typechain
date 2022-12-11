// import * as cypto from "crypto";
import crypto from "crypto";

interface BlockShape {
    hash: string;
    preHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public hash: string;
    constructor(
        public preHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(preHash, height, data);
    }
    static calculateHash(preHash: string, height: number, data: string) {
        const toHash = `${preHash}${height}}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class Blockchain {
    public blocks: Block[];

    constructor() {
        this.blocks = [];
    }
    private getPrevHash() {
        if (this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    addBlock(data: string) {
        const newBlock = new Block(
            this.getPrevHash(),
            this.blocks.length + 1,
            data
        );
        this.blocks.push(newBlock);
    }
    public getBlocks() {
        return [...this.blocks];
    }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second two");
blockchain.addBlock("Third three");
blockchain.addBlock("Fourth four");

console.log(blockchain.getBlocks());
