document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split('/').pop();

    if (page === 'laporan.html') {
        if (typeof dataTracking !== 'undefined' && dataTracking) {
            const doBody =document.getElementById('doBody');
            if (doBody) {
                doBody.innerHTML = '';
                Object.entries(dataTracking).forEach(([doNum, info]) => {
                    let progress = info.status === 'Dikirim' ? '100%' : (info.status === 'Dalam Perjalanan' ? '60%' : '20%');
                    const row = doBody.insertRow();
                    row.insertCell(0).innerText = doNum;
                    row.insertCell(1).innerText = info.nama;
                    row.insertCell(2).innerHTML = `<span class="status-badge">${info.status}</span>`;
                    row.insertCell(3).innerHTML = `<div class="progress-bar"><div style="width:${progress}" class="progress-fill"></div></div>`;
                });
            } else {
                console.warn("Elemen doBody tidak ditemukan di laporan.html");
            }
        } else {
            console.warn("dataTracking tidak tersedia di laporan.html");
        }

        if (typeof dataBahanAjar !== 'undefined' && dataBahanAjar) {
            const rekapBody = document.getElementById('rekapBody');
            if (rekapBody) {
                rekapBody.innerHTML = '';
                dataBahanAjar.forEach(item => {
                    const row = rekapBody.insertRow();
                    row.insertCell(0).innerText = item.kodeBarang;
                    row.insertCell(1).innerText = item.namaBarang;
                    row.insertCell(2).innerText = item.stok;
                });
            } else {
                console.warn("Elemen rekapBody tidak ditemukan di laporan.html");
            }
        } else {
            console.warn("dataBahanAjar tidak tersedia di laporan.html");
        }
    }
});