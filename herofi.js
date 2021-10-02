const Web3 = require('web3');

// const web3 = new Web3('http://127.0.0.1:3225');
const web3 = new Web3('https://bsc-dataseed1.defibit.io/');

const gwei = web3.utils.toWei('10','gwei'); //rokemedasi 10 - 15

async function swapStandard(pk, address, data) {
    try {

        let count = await web3.eth.getTransactionCount(`0x${address}`);
        let rawTransaction = {
            "from": `0x${address}`,
            "gasPrice": gwei,
            "gasLimit": web3.utils.toHex(1500000),
            "to": "0x16fb38712d355833647f4adfb1f6ff80f289c203",
            "data": data,
            "nonce": web3.utils.toHex(count),
            // "value": web3.utils.toHex(web3.utils.toWei(String((jumBuy * 0.028)), 'ether')),
        };
        const createTransaction = await web3.eth.accounts.signTransaction(
            rawTransaction,
            pk
        );

        let results = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);

        return Promise.resolve({
            result: results,
            link : `https://bscscan.com/${results.transactionHash}`
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

(async() => {

    let pk = '9788f0571dd834ac787636a9984a1c34da3e43c45dd12af268a00d691c6d4f56'; // pk
    let address = ''; //address tanpa 0x
    let data = ''; //ambil dari transaksi yang error
    console.log(await swapStandard(pk, address,data));
})()