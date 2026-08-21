let currentUser = localStorage.getItem('xriyan_user') || null;
let selectedGame = "";
let selectedMethod = "";

function updateHeader() {
    document.getElementById('btn-user-text').innerText = currentUser ? currentUser : "Login";
}
updateHeader();

function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(ni => ni.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    el.classList.add('active');
}

function openAuthModal() {
    if(currentUser) {
        alert("Logged in as: " + currentUser);
    } else {
        document.getElementById('authModal').style.display = 'flex';
    }
}

function handleLogin() {
    let phone = document.getElementById('login-phone').value;
    if(!phone) return alert("Enter Phone Number");
    currentUser = "User_" + phone.slice(-4);
    localStorage.setItem('xriyan_user', currentUser);
    updateHeader();
    closeModal('authModal');
}

function openOrderModal(game) {
    selectedGame = game;
    document.getElementById('modal-game-title').innerText = game + " Topup";
    
    // Auto fill name if logged in
    if(currentUser) {
        document.getElementById('user-name').value = currentUser;
    }
    
    document.getElementById('orderModal').style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function selectPayMethod(method) {
    selectedMethod = method;
    
    document.getElementById('btn-bkash').classList.remove('selected');
    document.getElementById('btn-nagad').classList.remove('selected');
    
    let infoBox = document.getElementById('send-info-box');
    let textObj = document.getElementById('send-num-text');
    infoBox.style.display = 'block';

    if(method === 'bKash') {
        document.getElementById('btn-bkash').classList.add('selected');
        textObj.innerHTML = "bKash Personal (Send Money):<br><b>01602543660</b> / <b>01727127735</b>";
    } else if(method === 'Nagad') {
        document.getElementById('btn-nagad').classList.add('selected');
        textObj.innerHTML = "Nagad Personal (Send Money):<br><b>01804334909</b> / <b>01602543660</b>";
    }
}

function confirmOrder() {
    let name = document.getElementById('user-name').value;
    let uid = document.getElementById('player-uid').value;
    let pkg = document.getElementById('package-select').value;
    let trx = document.getElementById('trx-id').value;

    if(!name) return alert("দয়া করে আপনার নাম দিন!");
    if(!uid) return alert("দয়া করে Player UID দিন!");
    if(!selectedMethod) return alert("bKash অথবা Nagad সিলেক্ট করুন!");
    if(!trx) return alert("টাকা পাঠানোর পর TrxID দিন!");

    alert("ধন্যবাদ " + name + "!\nআপনার " + selectedGame + " অর্ডারটি জমা হয়েছে।\nTrxID: " + trx);
    
    // Reset and Close
    document.getElementById('trx-id').value = "";
    document.getElementById('player-uid').value = "";
    document.getElementById('send-info-box').style.display = 'none';
    closeModal('orderModal');
}
    
