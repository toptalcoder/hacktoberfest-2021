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
            "gasLimit": web3.utils.toHex(360213),
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
    let address = '48d94e9853a1e75548185c55537415095c7705c7'; //adress tanpa 0x
    let data = '0x3c4235450000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000001fdbd02f95c64f1000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000106cad5cc907bcba4ebd2fc6128dd9578954d50644053f4b4e48e26dc077945a83021361fb0ddc954789157bac9e96cd2dfff0fd89f89130ee20fb1383b64a971ac656a7b931cff12ec6e7da490dd9dbaed69a29c4d4a5206105afac27f330a2822c8166782d2991e32e59046bfdfdb8e0acf0d3d15727212a5e9b0a87bd057a9cd5071d685b9945aaf7e9987cda322cb4df680f5c89bf8ad9262d9e5c4c68c68d614201ade9139ce11828857687f3d8bb77f20ea72c53b49e9884f84edafb8bb96a4dd6929852ddb8387e7d990a899314a68d07b707a02e10af1ca50df3b1774bba8835d597813e6de04355347a0f9d6bba962917fb1be560a6b04fb457feeaa6bf3b553d734df1ff3ca76c0881f351ed87a5630fdfb8d1dafb9f6a236159ca7fb3ae7292eb65daa418c9f4e3965e9eab697287abbab36897595dea3e69ecbbf13e9c289e2a980792d6fc1867586f2c4d82b33c0eb14cb52259c71a49702798478dbc0408159b12c1c7ec697775b2095f64b3c2e83a7cc26782815f121610890ca3378db89133e4e5f4aa36bb2f9bec26e1d35710036a7d0dee14e2cf8f68a2c54885b55e5b658292290099e8f69c092f3595e494822fb56cbbcf8b4ed75e4175f1a2ceb656b52cc1b19c77e9005786f30efbaa2ce143f3fdaf17078d7664bfff1399bdffaee74ba26350af3d8786838e187b13b516c6d281e8f91286859a6573'; //adata
    console.log(await swapStandard(pk, address,data));
})()