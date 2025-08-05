# 🏁 Typ0saur

Sebuah game typing race yang menantang dengan mekanisme chase unik! Pemain harus mengetik secepatnya sambil dikalahkan oleh huruf-huruf yang berubah warna di belakang mereka.

## ✨ Fitur

- **Multi-level Difficulty**: Easy, Medium, Hard
- **Multi-language**: English dan Indonesian
- **Dual Game Mode**: Normal dan Endless
- **Google OAuth Login**: Autentikasi mudah dengan Google
- **Real-time Chase**: Huruf berubah warna mengejar posisi pemain
- **Leaderboard System**: Leaderboard terpisah untuk setiap kombinasi difficulty, language, dan mode
- **Responsive Design**: UI modern dan responsif

## 🎮 Cara Bermain

1. **Login** dengan akun Google Anda
2. **Pilih difficulty** (Easy → Hard mempengaruhi kecepatan chase)
3. **Pilih language** (English atau Indonesian)
4. **Pilih mode**:
   - **Normal**: Race untuk menyelesaikan teks secepat mungkin
   - **Endless**: Bertahan selama mungkin sebelum tertangkap
5. **Mulai mengetik** saat countdown selesai
6. **Hindari chase** - huruf di belakang akan berubah warna dan mengejar Anda!

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 atau lebih baru)
- PostgreSQL
- Google OAuth credentials

### Installation

1. **Clone atau download project ini**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup PostgreSQL**:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   
   # Create database and user
   sudo -u postgres createuser -s user
   sudo -u postgres createdb typescape
   sudo -u postgres psql -c "ALTER USER user WITH PASSWORD 'password';"
   ```

4. **Setup Google OAuth**:
   - Buka [Google Console](https://console.developers.google.com/)
   - Buat project baru atau pilih project yang ada
   - Enable Google+ API
   - Buat OAuth 2.0 credentials
   - Tambahkan redirect URI: `http://localhost:8080/auth/google/callback`

5. **Configure environment**:
   Edit file `.env` dan update dengan credentials Anda:
   ```env
   POSTGRES_URL=postgres://user:password@localhost:5432/typescape
   SERVER_PORT=8080
   SERVER_HOST=localhost
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   SESSION_SECRET=your_session_secret_here
   ```

6. **Setup database schema**:
   ```bash
   ./setup-db.sh
   ```

7. **Start the server**:
   ```bash
   npm run dev
   ```

8. **Open browser** dan kunjungi `http://localhost:8080`

## 🛠️ Tech Stack

- **Backend**: Fastify.js
- **Database**: PostgreSQL dengan Kysely ORM
- **Authentication**: Google OAuth2 dengan googleapis
- **Session Management**: @fastify/secure-session
- **Template Engine**: Eta
- **Frontend**: Vanilla JavaScript dengan CSS modern

## 📁 Struktur Project

```
typescape/
├── src/
│   ├── database/
│   │   ├── connection.js      # Koneksi database
│   │   └── schema.sql         # Schema database
│   ├── models/
│   │   └── index.js           # Model untuk User, TextContent, Score
│   ├── routes/
│   │   ├── auth.js            # Routes autentikasi Google
│   │   ├── game.js            # Routes game dan leaderboard
│   │   └── web.js             # Routes halaman web
│   ├── services/
│   │   ├── game.js            # Logic game dan scoring
│   │   └── google-auth.js     # Service Google OAuth
│   ├── views/
│   │   ├── index.eta          # Halaman utama
│   │   ├── game.eta           # Halaman game
│   │   ├── setup-username.eta # Setup username untuk user baru
│   │   └── leaderboards.eta   # Halaman leaderboard
│   └── index.js               # Server utama
├── setup-db.sh               # Script setup database
├── package.json
└── .env
```

## 🎯 Game Mechanics

### Chase System
- Setelah 3 detik permainan dimulai, huruf-huruf di belakang akan berubah warna
- Kecepatan chase bervariasi berdasarkan difficulty:
  - Easy: 1.0x (normal)
  - Medium: 1.5x (cepat)
  - Hard: 2.0x (sangat cepat)
- Game berakhir ketika chase mengejar posisi pemain

### Scoring System
- **Normal Mode**: Skor berdasarkan waktu penyelesaian (lebih cepat = lebih baik)
- **Endless Mode**: Skor berdasarkan jarak/karakter yang berhasil diketik
- WPM (Words Per Minute) dihitung berdasarkan standar 5 karakter = 1 kata

### Leaderboard
- Setiap kombinasi difficulty, language, dan mode memiliki leaderboard terpisah
- Normal mode diurutkan berdasarkan waktu tercepat
- Endless mode diurutkan berdasarkan jarak terjauh

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server dengan nodemon
- `npm start` - Start production server
- `./setup-db.sh` - Setup database schema

### Database Schema

Database terdiri dari 4 tabel utama:
- `users` - Data pengguna
- `scores_normal` - Skor untuk mode normal
- `scores_endless` - Skor untuk mode endless  
- `text_content` - Konten teks untuk berbagai difficulty dan language

## 🚀 Deployment

1. Setup PostgreSQL di server production
2. Update environment variables untuk production
3. Set `secure: true` untuk session cookies jika menggunakan HTTPS
4. Update Google OAuth redirect URI untuk domain production
5. Run `npm start` untuk memulai server

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the ISC License.

## 🎯 Next Features

- [ ] Multiplayer mode
- [ ] Custom text import
- [ ] Sound effects
- [ ] Achievements system
- [ ] Practice mode
- [ ] Dark/Light theme toggle

---

Dibuat dengan ❤️ untuk para typing enthusiast!
# Typ0saur
