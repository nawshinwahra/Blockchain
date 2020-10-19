const SHA256 = require('crypto-js/sha256');

//class defination of block
class Block{
constructor(index, timestamp, data, previousHash ="")
{
    this.index = index;
        
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
     this.nonce = 0;
    this.hash = this.calculateHash();
   
    //var dt = new Date();
    //var timestamp = dt.toString();


}
//Function for hash calculating
calculateHash(){
   return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
   // return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
}
//proof of work mining
mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();

   }
    console.log("Block mined: " + this.hash);
  }

}


// creating blockchain

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
       // [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0,"08-18-2019", "Genesis block",{amount:"0"} );
    //createGenesisBlock(){
      // return this.chain[this.chain.length];
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        //newBlock.previousHash = this.getLatestBlock.hash;
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }
    isChainValid(){
        for( let i=1; i<this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];
        if(currentBlock.hash !== currentBlock.calculateHash()){
            return false;
        }
        if(currentBlock.previousHash!== previousBlock.hash){
            return false;
        }
        
    }
      return true; 
    }
}
let demoBlockchain = new Blockchain();
console.log("mining block 1....");
demoBlockchain.addBlock(new Block(1,"18/7/2019", { amount: 4 }));
console.log("mining block 2....");
demoBlockchain.addBlock(new Block(2,"30/7/2019", { amount: 15 }));


//creating hash
console.log(JSON.stringify(demoBlockchain, null, 2));
//tempering with blockchain
//tempering with curent blockchain
console.log("is Blockchian valid?\n" + demoBlockchain.isChainValid());
demoBlockchain.chain[1].data = {amount : 6};
//after tempering block doesnt match with previous block
console.log("is Blockchian valid?\n" + demoBlockchain.isChainValid().toString());
//demoBlockchain.chain[1].hash = demoBlockchain.chain[1].calculateHash();

