document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split('/').pop();

    if (page === 'historis.html') {
        const historiBody = document.getElementById('historiBody');
        if (historiBody && typeof dataTracking !== 'undefined') {
            Object.entries(dataTracking).forEach(([doNum, trans]) => {
                const row = historiBody.insertRow();
                row.insertCell(0).innerText = doNum;
                row.insertCell(1).innerText = trans.nama;
                row.insertCell(2).innerText = trans.tanggalKirim;
                row.insertCell(3).innerText = trans.total;
                row.insertCell(4).innerHTML = `<span class="status-badge">${trans.status}</span>`;
            });
            if (Object.keys(dataTracking).length === 0) {
                historiBody.innerHTML = '<tr><td colspan="5">Belum ada histori transaksi</td></tr>';
            }
        }
    }
});    