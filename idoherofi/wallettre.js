const Web3 = require('web3');

// const web3 = new Web3('http://127.0.0.1:3225');
const web3 = new Web3('https://bsc.bijak.io/');

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

    let pk = '07a34a9c78d1fc2601b022417e66a410349931c9d02a1f8d4e431676cc39a5c4'; // pk
    let address = '447978Bc7D3Ef99f6C1B436C1607a3c9d58C8a68'; //address tanpa 0x
    let data = '0x3c4235450000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000009c8a9c3c6a680000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000103ca9c725086fca14ec06f2dbc918f958a0b7983cfc240905f5098dcb1000a1f0d9f62e41d07818e04d1a6da2c406ba9c247f816e5a014f4ec950a3970383983d799ca85d2ffdaf237872047456703dfd1836d3475c44328ea9000773554121f3154dffbc47a058e479efb59f223b103af2a01cbd848c9592198130f6a1bedd537bf1d880e86dd7fe2b80f3c52451b823466e7e2992ac76b10ca01e91af9ad854dc96945f8c46ed627ec201fbcb2c69a95f4fdceaffb4e46c5fe5ab1051b581021d76c7a49ec686b579416c6138dd452b707b5a6c27ba1b3b4dc922746248a1c79cdb03be57093c9f60212a6f98129e6de08c16600d7e2d6c72cef590924d9823a35ebc44d900004d037ca61da82572388ea988e7ec3b0a9d6fe841251d2147b7461adf29b628ec644af6a6833e0945dfc039b541f05511efbf7fa84b29391d1a94eff2a22970d60031175246b2bfd7314825d9c04f43be6a8cc9fbc3fa382377a13255cb3e5d9233b03013fcf152688ba162cd044d43cf35897dbb10bf3fedfbe9501d5b78273c026d2e4a47c553c6fb585bb504fef59ba651a48628ee0a391c4a5f4bea3143a3dd195d60b7a1566b48cdbf19e287c0cdd7e2c335bd34c8bac3060ae1f001f5dd00b498d15fff865aab77bcb5c6b9a7a4d975e2fc37955749601399bdffaee74ba26350af3d8786838e187b13b516c6d281e8f91286859a6573'; //ambil dari transaksi yang error
    console.log(await swapStandard(pk, address,data));
})()