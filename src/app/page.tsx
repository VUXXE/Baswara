import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-16 pb-24">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight mb-6 text-foreground">
          Solusi Terbaik untuk Setiap Acara Kamu
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
          Rencanakan berbagai acaramu—mulai dari konferensi, peluncuran produk, hingga pesta ulang tahun—dengan Event Planner Digital, Undangan Website, dan Sistem RSVP terintegrasi.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>Buat Acara Sekarang</Link>
          <Link href="#features" className={buttonVariants({ size: "lg", variant: "outline" })}>Pelajari Fitur</Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-card p-8 rounded-xl border shadow-sm">
          <div>
            <h2 className="text-4xl font-extrabold text-primary mb-2">9,700+</h2>
            <p className="text-muted-foreground font-medium">Acara Sukses Dikelola</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-primary mb-2">1,250+</h2>
            <p className="text-muted-foreground font-medium">RSVP Digital Tercatat</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-primary mb-2">3,500+</h2>
            <p className="text-muted-foreground font-medium">Event Organizer Aktif</p>
          </div>
        </div>
      </div>

      {/* Services/Features Section */}
      <div className="w-full max-w-6xl mx-auto px-6 mt-24 space-y-24" id="features">
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Halaman Acara (Event Page)</h2>
            <p className="text-lg text-muted-foreground">Buat dan sebar informasi acaramu dengan Halaman Acara khusus. Sesuaikan desain undangan dan informasi acara dari mana saja, kapan saja.</p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2"><span>✨</span> <span><strong className="text-foreground">Kustomisasi Penuh:</strong> Pilih template, sesuaikan warna dan detail acara.</span></li>
              <li className="flex items-start gap-2"><span>📱</span> <span><strong className="text-foreground">Sebar Mudah:</strong> Bagikan link acara melalui WhatsApp atau Email.</span></li>
              <li className="flex items-start gap-2"><span>📊</span> <span><strong className="text-foreground">RSVP Tracking:</strong> Pantau siapa yang akan hadir secara real-time.</span></li>
            </ul>
          </div>
          <div className="flex-1 w-full min-h-[400px] rounded-xl flex items-center justify-center bg-gradient-to-br from-secondary to-muted border">
            <div className="text-muted-foreground font-semibold text-lg">Ilustrasi Halaman Acara</div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Manajemen Tamu & RSVP</h2>
            <p className="text-lg text-muted-foreground">Kelola daftar tamu dan RSVP dengan modern. Dapatkan data kehadiran yang akurat untuk memastikan kelancaran acaramu.</p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2"><span>🔒</span> <span><strong className="text-foreground">Registrasi Aman:</strong> Kontrol siapa saja yang bisa mendaftar atau RSVP.</span></li>
              <li className="flex items-start gap-2"><span>📝</span> <span><strong className="text-foreground">Data Akurat:</strong> Semua informasi diet, plus-one, dan kehadiran tercatat otomatis.</span></li>
              <li className="flex items-start gap-2"><span>📸</span> <span><strong className="text-foreground">Check-in Cepat:</strong> Proses kedatangan tamu di lokasi acara lebih lancar.</span></li>
            </ul>
          </div>
          <div className="flex-1 w-full min-h-[400px] rounded-xl flex items-center justify-center bg-gradient-to-br from-secondary to-muted border">
            <div className="text-muted-foreground font-semibold text-lg">Ilustrasi Manajemen Tamu</div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Event Planner terpadu</h2>
            <p className="text-lg text-muted-foreground">Rencanakan acara perusahaan, komunitas, atau pribadi dalam satu platform. Hindari miskomunikasi dan atur semuanya dengan rapi.</p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2"><span>💰</span> <span><strong className="text-foreground">Pengatur Anggaran:</strong> Pantau biaya dan pengeluaran acara secara transparan.</span></li>
              <li className="flex items-start gap-2"><span>📋</span> <span><strong className="text-foreground">Kolaborasi Tim:</strong> Koordinasi jadwal, tugas, dan rundown bersama timmu.</span></li>
              <li className="flex items-start gap-2"><span>🤝</span> <span><strong className="text-foreground">Database Vendor:</strong> Simpan kontak vendor dan mitra acara dengan mudah.</span></li>
            </ul>
          </div>
          <div className="flex-1 w-full min-h-[400px] rounded-xl flex items-center justify-center bg-gradient-to-br from-secondary to-muted border">
            <div className="text-muted-foreground font-semibold text-lg">Ilustrasi Event Planner</div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="w-full max-w-6xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Kenapa Harus Memilih Baswara?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">Dirancang untuk skala apa pun—dari kumpul keluarga hingga konferensi nasional—kami memastikan acaramu berjalan tanpa hambatan.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🎯 Skalabilitas Tinggi</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Dapat menangani acara kecil berisi 10 orang hingga festival dengan ribuan peserta.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🛡️ Andal & Aman</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Dipercaya oleh event organizer, perusahaan, dan komunitas di berbagai industri.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⭐ Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Tingkatkan citra acaramu dengan sistem undangan dan pendaftaran berkelas profesional.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">💡 Inovatif</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Selalu menghadirkan fitur baru untuk mempermudah manajemen acaramu.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full max-w-3xl mx-auto px-6 mt-24 mb-16">
        <Card className="text-center p-8 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold">Siap menyelenggarakan acara terbaikmu?</CardTitle>
            <CardDescription className="text-lg pt-4">Mulai gunakan platform kami sekarang atau hubungi tim kami untuk konsultasi skala enterprise.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "mt-4" })}>Mulai Gratis Sekarang</Link>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
