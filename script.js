// Firebase কনফিগারেশন (আপনার কনসোল থেকে এগুলো বসান)
const firebaseConfig = {
    apiKey: "AIzaSyBq6XsGEmnul-QVJNyemafvDICPTxbIrK0",
    authDomain: "ishtuu-app.firebaseapp.com",
    projectId: "ishtuu-app",
    storageBucket: "ishtuu-app.firebasestorage.app",
    messagingSenderId: "783914087222",
    appId: "1:783914087222:web:541a91e77ff9ca184f7997"
};
firebase.initializeApp(firebaseConfig);

function processCommand() {
    let inputField = document.getElementById('userInput');
    let userInput = inputField.value.trim();
    let chatContainer = document.getElementById('chat-container');

    if (userInput === "") return;

    // ইউজারের মেসেজ
    chatContainer.innerHTML += `<p class="user-msg"><b>তুমি:</b> ${userInput}</p>`;
    inputField.value = "";

    // বটের রেসপন্স ও লজিক
    setTimeout(() => {
        let response = "";
        if (userInput.toLowerCase().includes("ফোন") || userInput.toLowerCase().includes("number")) {
            response = "ঠিক আছে, এই নিন আপনার ফোনের কিউআর কোড:";
        } else if (userInput.toLowerCase().includes("লিঙ্ক") || userInput.toLowerCase().includes("http")) {
            response = "চমৎকার লিঙ্ক! এই নিন কিউআর কোড:";
        } else {
            response = "ইস্তু বুঝতে পেরেছে! এই নিন আপনার কিউআর কোড:";
        }
        
        chatContainer.innerHTML += `<p class="bot-msg"><b>Ishtuu:</b> ${response}</p>`;
        generateQR(userInput);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 600);
}

function generateQR(data) {
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    new QRCode(qrDiv, { text: data, width: 160, height: 160 });
    
    setTimeout(() => {
        const qrCanvas = qrDiv.querySelector("img");
        const downloadBtn = document.getElementById("downloadBtn");
        downloadBtn.href = qrCanvas.src;
        downloadBtn.style.display = "block";
    }, 500);
}

// এন্টার কি দিয়ে সেন্ড
document.getElementById('userInput').addEventListener("keypress", (e) => {
    if (e.key === "Enter") processCommand();
});
// ১. লগইন আছে কিনা চেক করা (যাতে কেউ ড্যাশবোর্ডে সরাসরি ঢুকতে না পারে)
firebase.auth().onAuthStateChanged(user => {
    if (!user && window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html";
    } else if (user) {
        document.getElementById('user-info').innerHTML = `<p>হ্যালো, ${user.displayName}!</p>`;
    }
});

// ২. লগআউট ফাংশন
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    });
}
