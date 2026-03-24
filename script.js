// ১. Firebase কনফিগারেশন (আপনার প্রজেক্ট সেটিংস থেকে এখানে বসান)
const firebaseConfig = {
    apiKey: "AIzaSyBq6XsGEmnul-QVJNyemafvDICPTxbIrK0",
    authDomain: "ishtuu-app.firebaseapp.com",
    projectId: "ishtuu-app",
    storageBucket: "ishtuu-app.firebasestorage.app",
    messagingSenderId: "783914087222",
    appId: "1:783914087222:web:541a91e77ff9ca184f7997"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ২. গুগল লগইন ফাংশন
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => location.reload());
}

// ৩. লগইন চেক ও ওয়েলকাম মেসেজ
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('bot-screen').style.display = 'block';
        document.getElementById('welcome-msg').innerText = `হ্যালো ${user.displayName}! আমি ইস্তু, তোমাকে কীভাবে সাহায্য করতে পারি?`;
    }
});

// ৪. QR জেনারেটর লজিক
function showInput(type) {
    document.getElementById('input-section').innerHTML = `
        <p>দয়া করে আপনার ${type} দিন:</p>
        <input type="text" id="userInput" placeholder="${type} লিখুন...">
        <button onclick="generate()">QR তৈরি করুন</button>
    `;
}

function generate() {
    const data = document.getElementById('userInput').value;
    document.getElementById('qrcode').innerHTML = ""; // আগের QR মোছা
    new QRCode(document.getElementById("qrcode"), data);
}