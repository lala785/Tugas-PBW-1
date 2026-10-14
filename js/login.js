document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split('/').pop();

    if (page === 'index.html') {

        const loginForm = document.getElementById('login-form');
        if(loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value;
                if (typeof dataPengguna !== 'undefined') {
                    const user = dataPengguna.find(u => u.email === email && u.password === password);
                    if (user) {
                        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                        window.location.href = 'dashboard.html';
                    } else {
                        alert('email/password yang anda masukkan salah');
                    }
                } else {
                    alert('Data pengguna tidak tersedia');
                }
            });
        }
        
        //lupa dan daftar
        const modalLupa = document.getElementById('modalLupa');
        const modalDaftar = document.getElementById('modalDaftar');
        const lupaBtn = document.getElementById('lupaPasswordBtn');
        const daftarBtn = document.getElementById('daftarBtn');
        if (lupaBtn) lupaBtn.onclick = () => { if (modalLupa) modalLupa.style.display = 'flex'; };
        if (daftarBtn) daftarBtn.onclick = () => { if (modalDaftar) modalDaftar.style.display = 'flex'; }; 
        const closeBtns = document.querySelectorAll('.close');
        closeBtns.forEach(btn => {
            btn.onclick = () => {
                if (modalLupa) modalLupa.style.display = 'none';
                if (modalDaftar) modalDaftar.style.display = 'none';
            };
        });
        window.onclick = (e) => {
            if (e.target === modalLupa) modalLupa.style.display = 'none';
            if (e.target === modalDaftar) modalDaftar.style.display = 'none';
        };
        const sendResetBtn = document.getElementById('sendResetBtn');
        if (sendResetBtn) sendResetBtn.onclick = () => {
            alert('Reset password dikirim');
            if (modalLupa) modalLupa.style.display = 'none';
        };
        const registerBtn = document.getElementById('registerBtn');
        if (registerBtn) registerBtn.onclick = () => {
            alert('Pendaftaran berhasil');
            if (modalDaftar) modalDaftar.style.display = 'none';
        };

        // ======================= AUTENTIKASI hanya bisa dibagian login =======================
        if (page !== 'index.html') {
            if (!sessionStorage.getItem('loggedInUser')) {
                window.location.href = 'index.html';
            }
        }
    }
});
