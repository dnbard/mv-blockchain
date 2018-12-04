const CryptoJS = require('crypto-js');

const Block = require('./block');

const firstBlockData = [ new Date().getTime() / 1000, null ];

const blockchain = [
    new Block(0, '', ...firstBlockData, calculateHash.apply(null, [0, ...firstBlockData, null]))
];

function calculateHash(index, previousHash, timestamp, data){
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};

function generateNextBlock(blockData){
    const previousBlock = getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};

function getLatestBlock(){
    return blockchain[blockchain.length - 1];
}

// function isValidNewBlock(newBlock, previousBlock){
//     if (previousBlock.index + 1 !== newBlock.index) {
//         console.log('invalid index');
//         return false;
//     } else if (previousBlock.hash !== newBlock.previousHash) {
//         console.log('invalid previoushash');
//         return false;
//     } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
//         console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
//         return false;
//     }
//     return true;
// };

blockchain.push(generateNextBlock({ id: 'object-1', data: { title: 'ABC', description: 'lorem ipsum' }, action: 'add' }));

console.log(JSON.stringify(blockchain, null, 2));

