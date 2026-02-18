# 🛒 Toko Online - Website E-commerce

Website e-commerce sederhana yang dibangun dengan HTML, CSS, dan JavaScript Vanilla.

## Fitur Utama

✅ **Autentikasi Pengguna**
- Registrasi akun baru
- Login dengan email dan password
- Logout

✅ **Katalog Produk**
- Display produk dengan informasi lengkap
- Pencarian produk real-time
- Kontrol kuantitas pembelian

✅ **Keranjang Belanja**
- Tambah/hapus produk dari keranjang
- Mengubah jumlah produk
- Perhitungan otomatis subtotal, pajak, dan total
- Menyimpan keranjang menggunakan localStorage

✅ **Desain Responsif**
- Mobile-friendly
- Tampilan yang menarik dan modern

## Cara Menggunakan

### 1. Buka Website
- Ekstrak file ke folder
- Buka file `index.html` di browser (tekan `Ctrl+O` atau drag file ke browser)
- Atau gunakan server lokal (Live Server extension di VS Code)

### 2. Daftar Akun Baru
- Klik menu "Login"
- Pilih "Daftar di sini"
- Isi form dengan nama, email, dan password
- Klik "Daftar"

### 3. Login
- Masuk dengan email dan password yang telah didaftarkan
- Setelah login, nama Anda akan muncul di menu

### 4. Belanja
- Lihat daftar produk di halaman beranda
- Gunakan fitur pencarian untuk mencari produk
- Atur jumlah produk dengan tombol +/-
- Klik "Tambah ke Keranjang"
- Lihat keranjang di menu "Keranjang"

### 5. Checkout
- Lihat ringkasan pembelian dengan total harga
- Klik "Lanjut ke Pembayaran"
- Pembelian selesai (dalam website ini prosesnya simulasi)

## File-file yang Disertakan

- `index.html` - Halaman beranda dan daftar produk
- `login.html` - Halaman login dan registrasi
- `cart.html` - Halaman keranjang belanja
- `style.css` - Styling website
- `script.js` - Logika dan fungsionalitas website
- `README.md` - File dokumentasi ini

## Data yang Disimpan

Website menggunakan `localStorage` browser untuk menyimpan:
- Data pengguna terdaftar
- Informasi login pengguna
- Isi keranjang belanja

Data akan hilang jika cache browser dihapus.

## Tips Pengembangan

Jika ingin menambahkan fitur:
1. **Backend/Database** - Gunakan Node.js, PHP, atau Python
2. **Payment Gateway** - Integrasikan dengan Midtrans, Xendit, dll
3. **Real-time Updates** - Gunakan WebSocket atau Firebase
4. **User Admin Panel** - Untuk mengelola produk dan pesanan

## Compatibility

✅ Chrome, Firefox, Safari, Edge
✅ Desktop dan Mobile
✅ Tidak memerlukan instalasi khusus

---

**Created:** February 2026
**Version:** 1.0
