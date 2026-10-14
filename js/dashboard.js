document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split('/').pop();

    if (page === 'dashboard.html') {
        if (!sessionStorage.getItem('loggedInUser')) {
            window.location.href = 'index.html';
            return;
        }
        const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        const hour = new Date().getHours();
        let greet = hour < 12 ? 'Selamat Pagi' : (hour < 16 ? 'Selamat Siang' : (hour < 18 ? 'Selamat Sore' : 'Selamat Malam'));
        const greetingSpan = document.getElementById('greeting');
        if (greetingSpan) greetingSpan.innerText = `${greet}, ${user.nama}`;
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.onclick = () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        };
        
        //Monitoring DO
        const monitoringBody = document.getElementById('monitoringBody');
        if (monitoringBody && typeof dataTracking !== 'undefined') {
            const entries = Object.entries(dataTracking);
            for (let i = 0; i < Math.min(entries.length, 5); i++) {
                const [doNum, info] = entries[i];
                let progress = info.status === 'Dikirim' ? '100%' : (info.status === 'Dalam Perjalanan' ? '60%' : '20%');
                const row = monitoringBody.insertRow();
                row.insertCell(0).innerText = doNum;
                row.insertCell(1).innerText = info.nama;
                row.insertCell(2).innerHTML = `<span class="status-badge">${info.status}</span`;
                row.insertCell(3).innerHTML = `<div class="progress-bar"><div style="width:${progress}" class="progress-fill"></div></div>`;
            }
        }

        //Rekap stok
        const rekapBody = document.getElementById('rekapBody');
        if (rekapBody && typeof dataBahanAjar !== 'undefined') {
            for (let i = 0; i < Math.min(dataBahanAjar.length, 5); i++) {
                const item = dataBahanAjar[i];
                const row = rekapBody.insertRow();
                row.insertCell(0).innerText = item.kodeBarang;
                row.insertCell(1).innerText = item.namaBarang;
                row.insertCell(2).innerText = item.stok;
            }
        }
    }
});