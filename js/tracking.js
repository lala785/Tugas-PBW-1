document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split('/').pop();
    if (page === 'tracking.html') {
        const cariBtn = document.getElementById('cariBtn');
        if (cariBtn) {
            cariBtn.onclick = () => {
                const doNum = document.getElementById('noDO').value.trim();
                if (typeof dataTracking === 'undefined') {
                    alert('Data tidak tidak tersedia');
                    return;
                }
                const data = dataTracking[doNum];
                const hasilDiv = document.getElementById('hasilTracking');
                if (!data) {
                    alert('Nomor DO tidak ditemukan');
                    if (hasilDiv) hasilDiv.style.display = 'none';
                    return;
                }
                const barang = (typeof dataBahanAjar !== 'undefined') ? dataBahanAjar.find(b => b.kodeBarang === data.paket) : null;
                const namaPaket = barang ? barang.namaBarang : data.paket;
                let progress = data.status === 'Dikirim' ? '100%' : (data.status === 'Dalam Perjalanan' ? '60%' : '30%');
                if (hasilDiv) {
                    hasilDiv.style.display = 'block';
                    hasilDiv.innerHTML = `
                        <h3>Tracking DO: ${doNum}</h3>
                        <div><strong>Nama:</strong> ${data.nama}</div>
                        <div><strong>Status:</strong> ${data.status}
                            <div class="progress-bar"><div style="width:${progress}" class="progress-fill"></div>
                        </div>
                        <div><strong>Ekspedisi:</strong> ${data.ekspedisi}</div>
                        <div><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</div>
                        <div><strong>Paket:</strong> ${namaPaket}</div>
                        <div><strong>Total:</strong> ${data.total}</div>
                        <hr><h4>Riwayat</h4><ul>${data.perjalanan.map(p => `<li> ${p.waktu} - ${p.keterangan}</li>`).join('')}</ul>

                    `;
                }
            }
        }
    }
});