// LocalStorage Check
let currentUser = localStorage.getItem('xriyan_user') || null;
let userBalance = parseInt(localStorage.getItem('xriyan_balance')) || 0;

function updateHeaderUser() {
    const btnText = document.getElementById('btn-user-text');
    if (currentUser) {
        btnText.innerText = currentUser;
    } else {
        btnText.innerText = "Login";
    }
}
updateHeaderUser();

function openProfileOrAuth() {
    if (currentUser) {
        document.getElementById('user-profile-name').innerText = currentUser;
        document.getElementById('user-balance-display').innerText = "Balance: " + userBalance + " BDT";
        document.getElementById('profileModal').style.display = 'flex';
    } else {
        document.getElementById('authModal').style.display = 'flex';
    }
}

function closeProfileModal() { document.getElementById('profileModal').style.display = 'none'; }
function closeAuthModal() { document.getElementById('authModal').style.display = 'none'; }

function switchAuthForm(formId, el) {
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(formId).classList.add('active');
    el.classList.add('active');
}

function handleSignup() {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();

    if(!name || !phone || !pass) {
        alert("সবগুলো ঘর ঠিকভাবে পূরণ করুন!");
        return;
    }

    currentUser = name;
    localStorage.setItem('xriyan_user', name);
    localStorage.setItem('xriyan_balance', '0');
    updateHeaderUser();
    closeAuthModal();
    alert("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
}

function handleLogin() {
    const phone = document.getElementById('login-phone').value.trim();
    const pass = document.getElementById('login-pass').value.trim();

    if(!phone || !pass) {
        alert("ফোন নম্বর এবং পাসওয়ার্ড দিন!");
        return;
    }

    currentUser = "User_" + phone.slice(-4);
    localStorage.setItem('xriyan_user', currentUser);
    updateHeaderUser();
    closeAuthModal();
    alert("লগইন সফল হয়েছে!");
}

function handleLogout() {
    localStorage.removeItem('xriyan_user');
    currentUser = null;
    updateHeaderUser();
    closeProfileModal();
}

function handleGameOrder(gameName) {
    if(!currentUser) {
        alert("অর্ডার করতে প্রথমে লগইন করুন!");
        openProfileOrAuth();
        return;
    }

    if(userBalance <= 0) {
        alert("আপনার ব্যালেন্স ০ টাকা! অর্ডার করতে প্রথমে টাকা এড করুন।");
        openProfileOrAuth();
        return;
    }

    alert(gameName + " অর্ডার গ্রহণ করা হয়েছে!");
}

function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(ni => ni.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    el.classList.add('active');
}

function switchSubTab(subId, el) {
    document.querySelectorAll('.sub-content').forEach(sc => sc.style.display = 'none');
    document.querySelectorAll('.sub-tab').forEach(st => st.classList.remove('active'));

    document.getElementById(subId).style.display = 'block';
    el.classList.add('active');
}

function renderLeaderboard() {
    const container = document.getElementById('topup-leaderboard-container');
    const dummyData = [
        { name: "XRIYAN BD", spent: "100,000 BDT" },
        { name: "Shadow Gamer", spent: "75,000 BDT" },
        { name: "Tanvir Boss", spent: "42,000 BDT" }
    ];

    let html = "";
    dummyData.forEach((item, index) => {
        html += `
        <div class="rank-item">
            <span class="rank-number">${index === 0 ? '🥇 1' : index === 1 ? '🥈 2' : '🥉 3'}</span>
            <div class="rank-info">
                <span class="rank-name">${item.name}</span>
            </div>
            <span class="rank-score">${item.spent}</span>
        </div>`;
    });
    container.innerHTML = html;
}

renderLeaderboard();
