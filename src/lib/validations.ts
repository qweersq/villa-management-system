import { z } from "zod";

export const VillaSchema = z.object({
  name: z.string().min(3, "Nama villa minimal 3 karakter"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Harga tidak valid"),
  location: z.string().min(3, "Lokasi wajib diisi"),
  capacity: z.coerce.number().min(1, "Kapasitas minimal 1"),
  imageUrl: z.string().url("URL gambar tidak valid").optional().or(z.literal('')),
});

export const ReservationSchema = z.object({
  villaId: z.string().uuid(),
  customerName: z.string().min(3, "Nama customer minimal 3 karakter"),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
}).refine(data => data.checkIn < data.checkOut, {
  message: "Tanggal check-out harus setelah check-in",
  path: ["checkOut"],
});
