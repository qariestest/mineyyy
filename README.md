# Untuk Yasmine — website hadiah anniversary

Website hadiah digital pribadi untuk Yasmine, dibuat oleh Gilang.
Vanilla HTML/CSS/JS — tidak perlu install apa pun, tidak perlu build.

## Struktur folder

```
index.html          -> struktur halaman
css/style.css        -> semua tampilan/warna/animasi
js/config.js          -> SEMUA teks, tanggal, nama file foto & lagu (edit di sini)
js/main.js            -> logika interaktif (biasanya tidak perlu diubah)
images/               -> taruh 5 foto asli di sini (lihat images/BACA-INI.txt)
audio/                 -> taruh lagu asli di sini (lihat audio/BACA-INI.txt)
```

## Cara menjalankan

Paling gampang: buka `index.html` langsung dua kali klik di file explorer/finder,
akan terbuka di browser (Chrome/Safari/Edge apa saja).

Kalau mau lebih rapi (supaya audio & font lebih pasti jalan mulus), bisa juga:
1. Upload seluruh folder ini ke hosting gratis seperti **Netlify** (drag & drop folder)
   atau **GitHub Pages** / **Vercel**.
2. Bagikan link-nya ke Yasmine.

Website butuh koneksi internet ringan untuk memuat font (Google Fonts) —
kalau offline total, font akan otomatis fallback ke font sistem, tetap rapi.

## Yang WAJIB kamu edit sebelum kirim ke Yasmine

1. **Foto** — taruh 5 foto asli di folder `images/` (lihat `images/BACA-INI.txt`
   untuk nama file yang harus dipakai persis).
2. **Lagu** — taruh `our-song.mp3` di folder `audio/`, lalu isi judul & artis
   di `js/config.js` bagian `song`.
3. **Undangan rahasia (bagian paling penting!)** — buka `js/config.js`,
   cari bagian `invitation`, lalu ganti:
   - `eventDateTime` — tanggal & jam dinner sebenarnya (formatnya sudah pakai
     zona waktu WIB / +07:00, tinggal ganti angkanya)
   - `location.name` dan `location.address` — lokasi dinner sebenarnya
   - `dressCode` dan `message` — sesuai maunya kamu

   Undangan otomatis "terbuka" 3 hari (72 jam) sebelum `eventDateTime` — kamu
   tidak perlu menghitung tanggal buka sendiri, itu otomatis. Kalau mau jarak
   yang berbeda, ganti angka `unlockBeforeHours`.

## Catatan teknis soal undangan rahasia

- Sebelum H-3, detail acara (lokasi, jam, dress code) otomatis diblur/terkunci.
  Yang kelihatan cuma judul & countdown.
- Tepat di H-3, ada animasi "unlock" singkat (3-2-1 lalu terbuka), sekali saja —
  kalau halaman dibuka ulang setelah itu, animasinya tidak diulang lagi.
- Semua perhitungan waktu pakai timestamp asli (`Date.now()` vs tanggal acara),
  bukan sekadar timer visual, jadi tetap akurat walau tab ditinggal lama.
- Ini website statis tanpa server, jadi secara teknis waktu di undangan mengikuti
  jam perangkat yang membuka website. Untuk hadiah pribadi seperti ini itu cukup
  aman — tidak perlu sistem keamanan tambahan.

## Kalau mau ganti warna/font

Semua warna & font ada sebagai variabel di paling atas `css/style.css`
(bagian `:root`), jadi tinggal ganti nilainya di satu tempat.

## Self-review singkat

- Sudah dicek: responsive dari HP kecil sampai desktop, animasi menghormati
  pengaturan "reduce motion", kontras teks terhadap foto sudah diberi lapisan
  gelap (scrim) supaya tetap terbaca, dan semua state undangan (locked/unlocked/
  event day/selesai) sudah diberi teks status untuk pembaca layar.
- Kalau ada foto/lagu yang belum ditaruh, website tidak akan rusak/blank —
  tampil placeholder yang jelas menyebutkan nama file yang perlu diganti.
