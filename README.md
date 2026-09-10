## Cara Menjalankan:
* Pastikan Node.js sudah terinstall.
* Clone repository:
  git clone https://github.com/nazwadiajeng/galatama-leaderboard_nazwa.git
* Masuk ke folder project:
  cd galatama-leaderboard_nazwa
* Install dependency:
  npm install
* Jalankan development server:
  npm run dev
* Kemudian buka alamat localhost yang ditampilkan oleh Vite pada browser.
## Keputusan Desain
Sebelum mulai coding, saya melakukan analisis terlebih dahulu terhadap beberapa game yang memiliki konsep serupa. Dari situ saya mencoba memahami alur permainan, tampilan, dan informasi apa saja yang perlu ditampilkan kepada pemain. Setelah melakukan analisis, saya membuat rancangan UI/UX terlebih dahulu supaya saya mempunyai gambaran mengenai layout dan alur aplikasi sebelum mulai mengimplementasikannya ke React.Saya menggunakan React karena banyak data pada aplikasi yang berubah selama permainan berlangsung, seperti timer, data tangkapan, total berat ikan, leaderboard, notifikasi tangkapan, dan status permainan.Untuk logika permainan, saya memisahkannya dari tampilan UI pada file ```text src/logic/gameLogic.js```.File tersebut menangani data pemain, pembuatan tangkapan ikan secara random, perhitungan total berat dan jumlah tangkapan pemain, pengurutan leaderboard, pencarian tangkapan terberat, serta pengaturan jeda tangkapan antara 3–6 detik. Pada bagian UI, saya membagi beberapa fungsi ke dalam component seperti `Timer`, `Leaderboard`, `HeaviestCatch`, dan `CatchToast`. Saya juga menggunakan state `waiting`, `running`, dan `ended` untuk mengatur alur permainan dari sebelum mulai, saat kompetisi berlangsung, sampai sesi berakhir. Saya juga menambahkan efek suara untuk membuat suasana permainan terasa lebih hidup. Musik background dapat dinyalakan atau dimatikan, kemudian ada suara khusus ketika mendapatkan ikan besar dan ketika waktu permainan berakhir. Untuk tampilan, saya mencoba membuat suasana seperti berada di dalam air dengan tambahan gambar ikan yang bergerak, bubble, efek visual, dan elemen UI yang menunjukkan status pertandingan secara real-time.
Walaupun begitu, menurut saya bagian UI masih bisa dikembangkan lagi. Misalnya menambahkan karakter yang sedang memancing, peralatan seperti pancing dan umpan, serta animasi karakter ketika mendapatkan ikan. Dengan tambahan tersebut, permainan bisa terasa lebih seperti game fishing dan tidak hanya berfokus pada leaderboard.
## Yang Masih Bisa Dikembangkan
Menurut saya project ini masih bisa dikembangkan lagi, terutama dari sisi pengalaman pengguna, visual, dan jika nantinya ingin dibuat menjadi game multiplayer yang sebenarnya.Beberapa hal yang masih ingin saya kembangkan:
* Memperbaiki sistem suara tangkapan agar suara catch hanya muncul pada kondisi yang sesuai dan tidak muncul kembali setelah satu hasil tangkapan yang tidak memenuhi kondisi musik latar tetap menyala selama permainan berlangsung..
* Menambahkan input nama pemain di halaman awal sebelum masuk ke permainan.
* Membuat tampilan awal yang menunjukkan karakter sedang memancing di atas permukaan air.
* Saat tombol Start ditekan, karakter dan kamera dibuat seperti turun ke bawah laut sebelum permainan dimulai.
* Membuat ikan bergerak dengan posisi dan arah yang lebih bervariasi sehingga tidak terlihat bergerak dengan pola yang sama.
* Menambahkan lebih banyak variasi ikan dan animasi supaya suasana bawah laut terasa lebih hidup.
* Menambahkan animasi karakter saat mendapatkan ikan.
* Menambahkan backend untuk menyimpan data dan hasil pertandingan.
* Menggunakan WebSocket agar data pemain dapat diperbarui secara real-time.
* Menambahkan sistem room untuk setiap pertandingan.
* Menambahkan sistem akun untuk pemain.
* Menyimpan leaderboard dari pertandingan sebelumnya.
* Menambahkan unit test untuk memastikan logic permainan berjalan dengan baik.
* Melakukan deployment agar project dapat diakses langsung melalui link tanpa harus menjalankannya melalui localhost.

Untuk versi tugas ini saya lebih fokus menyelesaikan logic utama seperti timer, simulasi tangkapan, leaderboard, notifikasi, dan pemisahan logic dengan UI. Beberapa pengembangan di atas menurut saya bisa dilakukan pada tahap berikutnya jika project ini dilanjutkan menjadi game yang lebih lengkap.
