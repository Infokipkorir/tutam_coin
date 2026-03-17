function generateRef(uid){
return uid.substring(0,6).toUpperCase();
}

function applyReferral(){

let code = document.getElementById("refInput").value;

if(!code){
alert("Enter code");
return;
}

alert("Referral applied! Bonus +500 coins");
addCoins(500);

}
