# Villa Management System

Aplikasi manajemen villa mini yang dibangun sebagai bagian dari take-home assignment rekrutmen Full Stack Developer. Mencakup fitur CRUD villa dan sistem reservasi dengan validasi overlap tanggal.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **UI**: Tailwind CSS & shadcn/ui
- **Validasi**: Zod

---

## Instalasi & Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd balimo-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` di root project:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/villa_db"
```

Ganti `USER`, `PASSWORD`, dan nama database sesuai konfigurasi PostgreSQL lokal kamu.

### 4. Jalankan Migrasi Database Prisma

```bash
npx prisma migrate dev --name init
```

Perintah ini akan:
- Membuat tabel `Villa` dan `Reservation` di database
- Menggenerate Prisma Client

### 5. (Opsional) Seed Data

```bash
npx prisma db seed
```

### 6. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Arsitektur Folder

```
src/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Halaman utama / dashboard
│   ├── actions.ts                  # Server Actions (CRUD villa & reservasi)
│   ├── villas/
│   │   ├── page.tsx               # List semua villa
│   │   ├── new/page.tsx           # Form tambah villa
│   │   └── [id]/edit/page.tsx     # Form edit villa
│   └── reservations/
│       ├── page.tsx               # List reservasi
│       └── new/page.tsx           # Form buat reservasi
│
├── components/
│   ├── ui/                        # Komponen shadcn/ui
│   ├── VillaForm.tsx              # Form komponen villa
│   └── ReservationForm.tsx        # Form komponen reservasi
│
└── lib/
    ├── prisma.ts                  # Prisma client singleton
    └── validations.ts             # Zod schema validasi
```

### Penjelasan Layer

| Layer | Lokasi | Tanggung Jawab |
|---|---|---|
| **Data Access** | `lib/prisma.ts` | Prisma client singleton |
| **Business Logic** | `app/actions.ts` | Server Actions + validasi overlap tanggal |
| **Schema Validasi** | `lib/validations.ts` | Zod schema (digunakan server & client) |
| **UI Components** | `components/` | React components presentational |
| **Routing & Pages** | `app/` | Next.js App Router pages |

---

## Migrasi Database Prisma

| Perintah | Keterangan |
|---|---|
| `npx prisma migrate dev` | Buat & jalankan migrasi baru (development) |
| `npx prisma migrate deploy` | Jalankan migrasi yang sudah ada (production) |
| `npx prisma studio` | Buka GUI untuk melihat isi database |
| `npx prisma generate` | Generate ulang Prisma Client |

---

## Fitur Utama

- **CRUD Villa** — Tambah, lihat, edit, dan hapus data unit villa (Nama, Harga, Lokasi, Kapasitas)
- **Sistem Reservasi** — Pilih villa dan rentang tanggal (Check-in & Check-out)
- **Validasi Overlap** — Sistem otomatis menolak booking jika tanggal bersinggungan dengan reservasi yang sudah ada
- **Server Actions** — Semua mutasi data menggunakan Next.js Server Actions
- **Type Safety** — Validasi end-to-end menggunakan Zod dan TypeScript
