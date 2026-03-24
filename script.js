// ১. Firebase কনফিগারেশন (এটি আপনার কনসোল থেকে পাওয়া কোড দিয়ে অবশ্যই আপডেট করবেন)
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

// ২. চ্যাট এবং কমান্ডের লজিক
function processCommand() {
    let inputField = document.getElementById('userInput');
    let userInput = inputField.value.trim();
    let chatContainer = document.getElementById('chat-container');

    if (userInput === "") return;

    // ইউজারের মেসেজ চ্যাটে দেখানো
    chatContainer.innerHTML += `<p><b>তুমি:</b> ${userInput}</p>`;
    
    // বট কি করবে তার লজিক
    if (userInput.toLowerCase() === "হাই" || userInput.toLowerCase() === "hello") {
        botResponse("হ্যালো! আমি ইস্তু। আমি তোমার জন্য QR কোড তৈরি করতে পারি। (ফোন, লিঙ্ক, টেক্সট, বা ইমোজি লিখুন)");
    } else {
        // এখানে QR জেনারেটরের কাজ শুরু হবে
        generateQR(userInput);
        botResponse("তোমার QR কোড তৈরি হয়েছে! নিচে ডাউনলোড করো:");
    }

    inputField.value = ""; // ইনপুট খালি করা
    chatContainer.scrollTop = chatContainer.scrollHeight; // স্ক্রল নিচে রাখা
}

// ৩. বট রেসপন্স ফাংশন
function botResponse(msg) {
    document.getElementById('chat-container').innerHTML += `<p><b>Ishtuu:</b> ${msg}</p>`;
}

// ৪. QR জেনারেশন ও ডাউনলোড ফাংশন
function generateQR(data) {
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; // আগের QR মুছে ফেলা
    
    // QR কোড তৈরি
    new QRCode(qrDiv, {
        text: data,
        width: 150,
        height: 150
    });

    // ডাউনলোড বাটন দেখানো
    setTimeout(() => {
        const qrCanvas = qrDiv.querySelector("img");
        const downloadBtn = document.getElementById("downloadBtn");
        downloadBtn.href = qrCanvas.src;
        downloadBtn.style.display = "inline-block";
    }, 500);
}

// ৫. এন্টার কি (Enter Key) দিয়ে সেন্ড করার সুবিধা
document.getElementById('userInput').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        processCommand();
    }
});
