import Link from 'next/link';
import './Landing.css';

export default function Home() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-section text-center">
        <h1 className="hero-title">Solusi Terbaik untuk Setiap Acara Kamu</h1>
        <p className="hero-subtitle">
          Rencanakan berbagai acaramu—mulai dari konferensi, peluncuran produk, hingga pesta ulang tahun—dengan Event Planner Digital, Undangan Website, dan Sistem RSVP terintegrasi.
        </p>
        <div className="hero-actions flex justify-center gap-4 mt-8">
          <Link href="/dashboard" className="btn btn-primary btn-lg">
            Buat Acara Sekarang
          </Link>
          <Link href="#features" className="btn btn-secondary btn-lg">
            Pelajari Fitur
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section container mt-8">
        <div className="stats-grid">
          <div className="stat-card">
            <h2 className="stat-number text-gradient">9,700+</h2>
            <p>Acara Sukses Dikelola</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-number text-gradient">1,250+</h2>
            <p>RSVP Digital Tercatat</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-number text-gradient">3,500+</h2>
            <p>Event Organizer Aktif</p>
          </div>
        </div>
      </div>

      {/* Services/Features Section */}
      <div className="services-section container mt-8" id="features">
        {/* Feature 1 */}
        <div className="service-row flex items-center justify-between gap-8 mb-8">
          <div className="service-content flex-1">
            <h2 className="text-gradient">Halaman Acara (Event Page)</h2>
            <p className="service-desc">Buat dan sebar informasi acaramu dengan Halaman Acara khusus. Sesuaikan desain undangan dan informasi acara dari mana saja, kapan saja.</p>
            <ul className="feature-list mt-4">
              <li>✨ <strong>Kustomisasi Penuh:</strong> Pilih template, sesuaikan warna dan detail acara.</li>
              <li>📱 <strong>Sebar Mudah:</strong> Bagikan link acara melalui WhatsApp atau Email.</li>
              <li>📊 <strong>RSVP Tracking:</strong> Pantau siapa yang akan hadir secara real-time.</li>
            </ul>
          </div>
          <div className="service-image-placeholder glass flex-1">
            <div className="placeholder-text">Ilustrasi Halaman Acara</div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="service-row flex items-center justify-between gap-8 mb-8 reverse">
          <div className="service-image-placeholder glass flex-1">
            <div className="placeholder-text">Ilustrasi Manajemen Tamu</div>
          </div>
          <div className="service-content flex-1">
            <h2 className="text-gradient">Manajemen Tamu & RSVP</h2>
            <p className="service-desc">Kelola daftar tamu dan RSVP dengan modern. Dapatkan data kehadiran yang akurat untuk memastikan kelancaran acaramu.</p>
            <ul className="feature-list mt-4">
              <li>🔒 <strong>Registrasi Aman:</strong> Kontrol siapa saja yang bisa mendaftar atau RSVP.</li>
              <li>📝 <strong>Data Akurat:</strong> Semua informasi diet, plus-one, dan kehadiran tercatat otomatis.</li>
              <li>📸 <strong>Check-in Cepat:</strong> Proses kedatangan tamu di lokasi acara lebih lancar.</li>
            </ul>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="service-row flex items-center justify-between gap-8 mb-8">
          <div className="service-content flex-1">
            <h2 className="text-gradient">Event Planner terpadu</h2>
            <p className="service-desc">Rencanakan acara perusahaan, komunitas, atau pribadi dalam satu platform. Hindari miskomunikasi dan atur semuanya dengan rapi.</p>
            <ul className="feature-list mt-4">
              <li>💰 <strong>Pengatur Anggaran:</strong> Pantau biaya dan pengeluaran acara secara transparan.</li>
              <li>📋 <strong>Kolaborasi Tim:</strong> Koordinasi jadwal, tugas, dan rundown bersama timmu.</li>
              <li>🤝 <strong>Database Vendor:</strong> Simpan kontak vendor dan mitra acara dengan mudah.</li>
            </ul>
          </div>
          <div className="service-image-placeholder glass flex-1">
            <div className="placeholder-text">Ilustrasi Event Planner</div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="why-us-section container mt-8 mb-8 text-center">
        <h2>Kenapa Harus Memilih RSVPhub?</h2>
        <p className="subtitle mx-auto">Dirancang untuk skala apa pun—dari kumpul keluarga hingga konferensi nasional—kami memastikan acaramu berjalan tanpa hambatan.</p>
        
        <div className="why-us-grid mt-8">
          <div className="card feature-card">
            <h3>🎯 Skalabilitas Tinggi</h3>
            <p>Dapat menangani acara kecil berisi 10 orang hingga festival dengan ribuan peserta.</p>
          </div>
          <div className="card feature-card">
            <h3>🛡️ Andal & Aman</h3>
            <p>Dipercaya oleh event organizer, perusahaan, dan komunitas di berbagai industri.</p>
          </div>
          <div className="card feature-card">
            <h3>⭐ Profesional</h3>
            <p>Tingkatkan citra acaramu dengan sistem undangan dan pendaftaran berkelas profesional.</p>
          </div>
          <div className="card feature-card">
            <h3>💡 Inovatif</h3>
            <p>Selalu menghadirkan fitur baru untuk mempermudah manajemen acaramu.</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="cta-section container text-center mt-8 mb-8 glass card">
        <h2>Siap menyelenggarakan acara terbaikmu?</h2>
        <p className="mb-8">Mulai gunakan platform kami sekarang atau hubungi tim kami untuk konsultasi skala enterprise.</p>
        <Link href="/dashboard" className="btn btn-primary btn-lg">
          Mulai Gratis Sekarang
        </Link>
      </div>

    </div>
  );
}
