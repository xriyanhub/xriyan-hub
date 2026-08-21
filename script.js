// TELEGRAM WEBAPP DETECTION
const tg = window.Telegram ? window.Telegram.WebApp : null;
if(tg) {
    tg.expand();
    if(tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const tgUser = tg.initDataUnsafe.user;
        if(!localStorage.getItem('xriyan_user')) {
            const fullName = (tgUser.first_name + " " + (tgUser.last_name || "")).trim();
            localStorage.setItem('xriyan_user', fullName || tgUser.username || "TG User");
        }
    }
}

// RANDOM AVATARS POOL
const avatarPool = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=Xriyan1",
    "https://api.dicebear.com/7.x/bottts/svg?seed=GamerPro",
    "https://api.dicebear.com/7.x/bottts/svg?seed=ShadowBD",
    "https://api.dicebear.com/7.x/bottts/svg?seed=KingX"
];

// USER STATE
let currentUser = localStorage.getItem('xriyan_user') || null;
let userSpent = parseInt(localStorage.getItem('xriyan_spent')) || 100000;
let userAvatar = localStorage.getItem('xriyan_avatar') || avatarPool[Math.floor(Math.random() * avatarPool.length)];

function getVipInfo(spent) {
    if(spent >= 100000) return { level: "VIP 4 (GOD)", next: 100000, percent: 100 };
    if(spent >= 60000) return { level: "VIP 3", next: 100000, percent: ((spent/100000)*100) };
    if(spent >= 30000) return { level: "VIP 2", next: 60000, percent: ((spent/60000)*100) };
    if(spent >= 10000) return { level: "VIP 1", next: 30000, percent: ((spent/30000)*100) };
    return { level: "VIP 0", next: 10000, percent: ((spent/10000)*100) };
}

function updateHeaderUser() {
    const btnText = document.getElementById('btn-user-text');
    if (currentUser) {
        btnText.innerText = currentUser;
    } else {
        btnText.innerText = "Login / Account";
    }
}
updateHeaderUser();

function openProfileOrAuth() {
    if (currentUser) {
        document.getElementById('user-pp-img').src = userAvatar;
        document.getElementById('user-profile-name').innerText = currentUser;
        
        const vip = getVipInfo(userSpent);
        document.getElementById('user-vip-level').innerText = "👑 " + vip.level;
        document.getElementById('spent-amount-txt').innerText = "Spent: " + userSpent.toLocaleString() + " BDT";
        document.getElementById('next-vip-txt').innerText = "Target: " + vip.next.toLocaleString() + " BDT";
        document.getElementById('vip-bar-fill').style.width = vip.percent + "%";

        document.getElementById('profileModal').style.display = 'flex';
    } else {
        document.getElementById('authModal').style.display = 'flex';
    }
}

function closeProfileModal() { document.getElementById('profileModal').style.display = 'none'; }
function openAuthModal() { document.getElementById('authModal').style.display = 'flex'; }
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
        alert("সবগুলো ঘর সঠিকভাবে পূরণ করুন!");
        return;
    }

    currentUser = name;
    localStorage.setItem('xriyan_user', name);
    localStorage.setItem('xriyan_avatar', userAvatar);
    updateHeaderUser();
    closeAuthModal();
    alert("একাউন্ট তৈরি সফল হয়েছে!");
}

function handleLogin() {
    const phone = document.getElementById('login-phone').value.trim();
    const pass = document.getElementById('login-pass').value.trim();

    if(!phone || !pass) {
        alert("ফোন নম্বর এবং পাসওয়ার্ড দিন!");
        return;
    }

    currentUser = phone.split('@')[0];
    localStorage.setItem('xriyan_user', currentUser);
    updateHeaderUser();
    closeAuthModal();
    alert("লগইন সফল হয়েছে!");
}

function googleAuthSimulate() {
    currentUser = "Gamer_" + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('xriyan_user', currentUser);
    updateHeaderUser();
    closeAuthModal();
    alert("Google দিয়ে সফলভাবে প্রবেশ করেছেন!");
}

function handleLogout() {
    localStorage.removeItem('xriyan_user');
    currentUser = null;
    updateHeaderUser();
    closeProfileModal();
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
        { name: "XRIYAN BD", spent: "100,000 BDT", vip: "VIP 4 (GOD)" },
        { name: "Shadow Gamer", spent: "75,000 BDT", vip: "VIP 3" },
        { name: "Tanvir Boss", spent: "42,000 BDT", vip: "VIP 2" },
        { name: "Fahim Pro", spent: "15,000 BDT", vip: "VIP 1" }
    ];

    let html = "";
    dummyData.forEach((item, index) => {
        html += `
        <div class="rank-item ${index === 0 ? 'user-highlight' : ''}">
            <span class="rank-number">${index === 0 ? '🥇 1' : index === 1 ? '🥈 2' : index === 2 ? '🥉 3' : (index + 1)}</span>
            <div class="rank-info">
                <span class="rank-name">${item.name}</span>
                <span class="badge-vip">${item.vip}</span>
            </div>
            <span class="rank-score">${item.spent}</span>
        </div>`;
    });
    container.innerHTML = html;
}

renderLeaderboard();
          
