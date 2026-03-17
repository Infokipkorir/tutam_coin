let userCoins = 0;
let currentUser = null;
let isSignup = false;

/* TOGGLE AUTH */
function toggleAuth(){
isSignup = !isSignup;

document.getElementById("authTitle").innerText = isSignup ? "Sign Up" : "Sign In";
document.getElementById("authBtn").innerText = isSignup ? "Sign Up" : "Sign In";
document.getElementById("name").style.display = isSignup ? "block" : "none";
}

/* AUTH */
function auth(){

let email = document.getElementById("email").value;
let pass = document.getElementById("password").value;
let name = document.getElementById("name").value;

if(isSignup){

auth.createUserWithEmailAndPassword(email, pass)
.then(user => {

let uid = user.user.uid;
let ref = generateRef(uid);

db.collection("users").doc(uid).set({
name,
email,
coins:0,
ref
});

alert("Account created!");

})
.catch(err=>alert(err.message));

}else{

auth.signInWithEmailAndPassword(email, pass)
.catch(err=>alert(err.message));

}
}

/* AFTER LOGIN */
auth.onAuthStateChanged(user=>{
if(user){
currentUser = user;

db.collection("users").doc(user.uid).get().then(doc=>{
let data = doc.data();
userCoins = data.coins;
document.getElementById("balance").innerText = userCoins;
document.getElementById("refCode").innerText = data.ref;
});
}
});

/* ADD COINS */
function addCoins(amount){
userCoins += amount;

db.collection("users").doc(currentUser.uid).update({
coins:userCoins
});

document.getElementById("balance").innerText = userCoins;
}

/* VIDEO EARNING */
let vid = document.getElementById("video");
let interval;

vid.onplay = ()=>{
interval = setInterval(()=>{
addCoins(30);
},1000);
};

vid.onpause = ()=>clearInterval(interval);
vid.onended = ()=>clearInterval(interval);

/* MODAL */
function openModal(){
document.getElementById("modal").style.display="block";
}
db.collection("users").doc(uid).set({
name,
email,
coins:0,
ref,
totalRefs:0,
refEarn:0,
refUsed:false
});
function checkReferralLink(){

let url = new URL(window.location.href);
let ref = url.searchParams.get("ref");

if(ref){
localStorage.setItem("pendingRef", ref);
}
}

checkReferralLink();
let pending = localStorage.getItem("pendingRef");

if(pending){
document.getElementById("refInput").value = pending;
applyReferral();
localStorage.removeItem("pendingRef");
  }
