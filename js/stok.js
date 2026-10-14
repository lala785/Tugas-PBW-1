document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split('/').pop();

    if (page === 'stok.html') {
        if(typeof dataBahanAjar === 'undefined') {
            console.error('dataBahanAjar tidak ditemukan!');
            return;
        }

        const IMG_BASE = 'img/';

        //Mapping kode barang
        const coverMap = {
            'SKOM4101': 'pengantar_komunikasi.jpg',
            'EKMA4213': 'manajemen_keuangan.jpg',
            'ADPU4334': 'kepemimpinan.jpg',
            'BIOL4223': 'mikrobiologi.jpg',
            'PAUD4306': 'paud_perkembangan.jpeg'
        };

        function getCoverUrl(item) {
            if (item.cover) return item.cover;
            let fileName = coverMap[item.kodeBarang];
            if (!fileName) {
                const nama = (item.namaBarang || '').toLowerCase();
                if (nama.includes('komunikasi')) fileName = 'pengantar_komunikasi.jpg';
                else if (nama.includes('keuangan')) fileName = 'manajemen_keuangan.jpg';
                else if (nama.includes('kepemimpinan')) fileName = 'kepemimpinan.jpg';
                else if (nama.includes('biologi')) fileName = 'mikrobiologi.jpg';
                else if (nama.includes('paud') || nama.includes('perkembangan')) fileName = 'paud_perkembangan.jpeg';
                else fileName = 'default.jpg';
            }
            const fullPath = IMG_BASE +fileName;
            console.log(`[DEBUG] Mencoba Gambar : ${fullPath} untuk ${item.namaBarang} (${item.kodeBarang})`);
            return fullPath;
        }

        function renderStok() {
            const tbody = document.getElementById('stokBody');
            if (!tbody) return;
            tbody.innerHTML = '';
            for (let i = 0; i < dataBahanAjar.length; i++) {
                const item = dataBahanAjar[i];
                const row = tbody.insertRow();

                const imgCell = row.insertCell(0);
                const img = document.createElement('img');
                img.style.width = '50px';
                img.style.height = '60px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '6px';
                img.alt = item.namaBarang;
                img.src = getCoverUrl(item) || 'img/default.jpg'; // jika cover tidak ada
                img.onerror = function() { 
                    img.onerror = null;
                    img.src = 'img/default.jpg'; 
                };
                imgCell.appendChild(img);

                //kolom lainnya
                row.insertCell(1).innerText = item.kodeLokasi || '';
                row.insertCell(2).innerText = item.kodeBarang || '';
                row.insertCell(3).innerText = item.namaBarang || '';
                row.insertCell(4).innerText = item.jenisBarang || '';
                row.insertCell(5).innerText = item.edisi || '';
                row.insertCell(6).innerText = item.stok || 0;
            
                const btnHapus = document.createElement('button');
                btnHapus.innerText = 'Hapus';
                btnHapus.className = 'btn-small';
                btnHapus.onclick = (function(idx) {
                    return function() {dataBahanAjar.splice(idx, 1); renderStok();};
                })(i);
                row.insertCell(7).appendChild(btnHapus);
            }
        }

        // tambah stok sama seperti sebelumnya, tetapi simpan cover dengan path img
        const tambahBtn = document.getElementById('tambahBarisBtn');
        const modal = document.getElementById('modalTambahStok');
        const simpanBtn = document.getElementById('simpanStokBaru');
        if (tambahBtn && modal) {
            tambahBtn.onclick = () => modal.style.display = 'flex';
            const closeSpan = modal.querySelector('.close');
            if (closeSpan) closeSpan.onclick = () => modal.style.display = 'none';
            window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
        }
        if (simpanBtn) {
            simpanBtn.onclick = () => {
                const newItem = {
                    kodeLokasi: document.getElementById('newKodeLokasi').value,
                    kodeBarang: document.getElementById('newKodeBarang').value,
                    namaBarang: document.getElementById('newNamaBarang').value,
                    jenisBarang: document.getElementById('newJenis').value,
                    edisi: document.getElementById('newEdisi').value,
                    stok: parseInt(document.getElementById('newStok').value) || 0,
                    cover: document.getElementById('newCover').value.trim() || 'img/default.jpg'
                };
                if (newItem.kodeBarang && newItem.namaBarang) {
                    dataBahanAjar.push(newItem);
                    renderStok();
                    modal.style.display = 'none';
                    // reset form
                    document.getElementById('newKodeLokasi').value = '';
                    document.getElementById('newKodeBarang').value = '';
                    document.getElementById('newNamaBarang').value = '';
                    document.getElementById('newJenis').value = '';
                    document.getElementById('newEdisi').value = '';
                    document.getElementById('newStok').value = '';
                    document.getElementById('newCover').value = '';
                    alert('Baris stok baru ditambahkan!');
                } else {
                    alert('Kode Barang dan Nama Barang wajib diisi');
                }
            };
        }
        renderStok();
    }
});
