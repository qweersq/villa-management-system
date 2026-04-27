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

### 3. Setup Database & Environment Variables

Buat database PostgreSQL baru bernama `balimo_villa`:
```bash
createdb balimo_villa
```

Lalu sesuaikan `.env` di root project:

```env
DATABASE_URL="postgresql://macpro@localhost:5432/balimo_villa?schema=public"
```

### 4. Jalankan Migrasi Database Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

Perintah ini akan:
- Membuat tabel `Villa` dan `Reservation` di database
- Menggenerate Prisma Client versi terbaru

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
│   ├── layout.tsx                  # Root layout (Navbar & Font Outfit)
│   ├── page.tsx                    # Dashboard (Stats & Featured Villas)
│   ├── actions.ts                  # Server Actions (CRUD & Overlap Validation)
│   ├── villas/
│   │   ├── page.tsx               # List villa dengan thumbnail
│   │   ├── new/page.tsx           # Form tambah villa
│   │   └── [id]/edit/page.tsx     # Form edit villa
│   └── reservations/
│       ├── page.tsx               # List reservasi dengan icon user
│       ├── new/page.tsx           # Form buat reservasi
│       └── [id]/edit/page.tsx     # Form edit reservasi
│
├── components/
│   ├── ui/                        # Komponen shadcn/ui
│   └── ReservationForm.tsx        # Reusable form (Create & Edit)
│
└── lib/
    ├── prisma.ts                  # Prisma client singleton (v7 Adapter)
    └── validations.ts             # Zod schema validasi
```

### Penjelasan Layer

| Layer | Lokasi | Tanggung Jawab |
|---|---|---|
| **Data Access** | `lib/prisma.ts` | Prisma client + PG Adapter (v7 compatibility) |
| **Business Logic** | `app/actions.ts` | Server Actions + logic overlap booking |
| **Schema Validasi** | `lib/validations.ts` | Zod schema (cross-field validation) |
| **UI Components** | `components/` | React components & shadcn primitives |
| **Routing & Pages** | `app/` | Next.js App Router (RSC & Client Components) |

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

- **Dashboard Modern** — Statistik unit & reservasi serta tampilan Villa Unggulan.
- **CRUD Villa Penuh** — Kelola data villa (Nama, Harga, Lokasi, Kapasitas) termasuk **Image URL support**.
- **Sistem Reservasi & Edit** — Booking villa dengan sistem validasi tanggal yang cerdas.
- **Validasi Overlap** — Pencegahan otomatis booking ganda/bertabrakan di villa yang sama.
- **UI/UX Premium** — Menggunakan font **Outfit**, desain *glassmorphism* navbar, dan icon dari Lucide React.
- **Server Actions & Zod** — Penanganan data yang aman dan ter-validasi di sisi server.
- **Prisma v7 Support** — Implementasi terbaru menggunakan PostgreSQL adapter.
