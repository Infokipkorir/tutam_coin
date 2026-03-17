async function loadBTC(){

let res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");

let data = await res.json();

document.getElementById("btcPrice").innerText = "$" + data.bitcoin.usd;

}

setInterval(loadBTC,5000);
loadBTC();
