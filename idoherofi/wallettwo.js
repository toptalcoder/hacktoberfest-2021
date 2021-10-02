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
            "gasLimit": web3.utils.toHex(400000),
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

    let pk = 'ee2667ad79b624889d11beea598eb70728682a8591c4889db5d38d9337d293f9'; // pk
    let address = '0FA9203977A2F0b61A36d7C77b9d6113e75a57B4'; //address tanpa 0x
    let data = '0x3c4235450000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000b561c8225903d7970000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000ed6554db1bb2732f9e110a128b3e14d42a6466936089d1b0dd9d2620b92077cdabcbb1b052fdcb8a465bb016cd66bd9c568518509e2cbbdc4b3a23e194a0656c260a02269f07f419cd240fc21a030cea3ce471cd50e55f0570b0c60e90abeedb47870762618ed76d7031fab7e20b1f18b0c75d073049e7b87d5d5693c7e343998602536eb091319a39214c6d658661dbc5dfbf750812bb5ddcb3bfb514090de290dbd746a1338b8ce3bff84c74be5221825adc83e8fd9a5d2022c238ef846c8c74e458b45c0122c62bbeb42906e0adf9bad24e7dc4deaf4b1d805e0cd90265ee0476424fda356d2f30ff0957db23d43998aa199b47720fdcc56970bba2c0b8571b861df64efff6b8fdc49be317f4e7d6d92296ce2728bb04745966b463f5b3ae49dbb262f052a456fa6a6c4267bc8945ab6cd61fd2ac91a94fcfa2b4d3cae366e055cafab77a18e367be12330fa04ad1e8a92ae83eedd64420508ef59f7504218dd6dd854bc417959757d58293ed75f4927ff60410bdc9e6d94ad1cb83b4bc231c81afb413a4a07a1859655cf1e980e66223d95c2241a6f90049172d7ddb55808c8c7a6f61d5ba4575c32ad9debbe80ba987575bbaaea2b0c50ce1092d770f431'; //ambil dari transaksi yang error
    console.log(await swapStandard(pk, address,data));
})()