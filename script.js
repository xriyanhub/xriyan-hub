let currentUser = localStorage.getItem('xriyan_user') || null;
let selectedGame = "";
let selectedMethod = "";

function showNotification(msg) {
    let notify = document.getElementById("notification");
    notify.innerText = msg;
    notify.className = "show";
    setTimeout(function(){ notify.className = notify.className.replace("show", ""); }, 3000);
}

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
        showNotification("Logged in as: " + currentUser);
    } else {
        document.getElementById('authModal').style.display = 'flex';
    }
}

function handleLogin() {
    let phone = document.getElementById('login-phone').value;
    if(!phone) return showNotification("দয়া করে ফোন নম্বর দিন!");
    currentUser = "User_" + phone.slice(-4);
    localStorage.setItem('xriyan_user', currentUser);
    updateHeader();
    closeModal('authModal');
    showNotification("লগইন সফল হয়েছে!");
}

function openOrderModal(game) {
    selectedGame = game;
    document.getElementById('modal-game-title').innerText = game + " Topup";
    document.getElementById('orderModal').style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function copyNum(num) {
    navigator.clipboard.writeText(num);
    showNotification("নম্বর কপি হয়েছে: " + num);
}

function selectPayMethod(method) {
    selectedMethod = method;
    let bKashBtn = document.getElementById('btn-bkash');
    let nagadBtn = document.getElementById('btn-nagad');
    let infoBox = document.getElementById('send-info-box');
    let numList = document.getElementById('number-list');
    
    infoBox.style.display = 'block';

    if(method === 'bKash') {
        bKashBtn.className = 'pay-btn bkash-active';
        nagadBtn.className = 'pay-btn';
        numList.innerHTML = `
            <div class="num-item">
                <span>01602543660</span>
                <button class="copy-btn" onclick="copyNum('01602543660')"><i class="fa-regular fa-copy"></i> Copy</button>
            </div>
            <div class="num-item">
                <span>01727127735</span>
                <button class="copy-btn" onclick="copyNum('01727127735')"><i class="fa-regular fa-copy"></i> Copy</button>
            </div>`;
    } else if(method === 'Nagad') {
        nagadBtn.className = 'pay-btn nagad-active';
        bKashBtn.className = 'pay-btn';
        numList.innerHTML = `
            <div class="num-item">
                <span>01804334909</span>
                <button class="copy-btn" onclick="copyNum('01804334909')"><i class="fa-regular fa-copy"></i> Copy</button>
            </div>
            <div class="num-item">
                <span>01602543660</span>
                <button class="copy-btn" onclick="copyNum('01602543660')"><i class="fa-regular fa-copy"></i> Copy</button>
            </div>`;
    }
}

function confirmOrder() {
    let uid = document.getElementById('player-uid').value;
    let pkg = document.getElementById('package-select').value;
    let trx = document.getElementById('trx-id').value;

    if(!uid) return showNotification("দয়া করে Player UID দিন!");
    if(!selectedMethod) return showNotification("bKash অথবা Nagad সিলেক্ট করুন!");
    if(!trx) return showNotification("টাকা পাঠানোর পর TrxID দিন!");

    showNotification("ধন্যবাদ! আপনার " + selectedGame + " এর অর্ডার জমা হয়েছে।");
    
    document.getElementById('trx-id').value = "";
    document.getElementById('player-uid').value = "";
    document.getElementById('send-info-box').style.display = 'none';
    closeModal('orderModal');
}
