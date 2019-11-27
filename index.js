const express = require('express')
const axios = require('axios')
const math = require('mathjs')
var app = express()

app.get('/collateral', async (req, res) => {
    try {
        res.send(await checkForCollateral(req.query['address']))        
    } catch(err) {
        console.log(err)
    }
})

async function checkForCollateral(address) {
    let collateraltxid, outputid
    try {
        const query = await axios.get(`https://www.coinexplorer.net/api/v1/CORN/address/unspent?address=${address}`) 
        
        query.data.result.forEach(utxo => {
            if(utxo.value == 10000) {
                collateraltxid = utxo.txid
                outputid = utxo.vout
            }
        });
    } catch(err) {
        console.log(err)
        return 404
    }
    if(collateraltxid != undefined && outputid != undefined)
        return `${collateraltxid}${outputid}`
    else
        return 404
}

app.listen(42420)