'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createReservation } from "@/app/actions";
import { useRouter } from "next/navigation";

export function ReservationForm({ villas }: { villas: any[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await createReservation(formData);
    
    if (result?.error) {
      // Menampilkan error validasi overlap dari Server Action
      if (result.error.fieldErrors?.checkIn) {
        setError(result.error.fieldErrors.checkIn[0]);
      } else {
        setError("Gagal membuat reservasi. Pastikan semua data benar dan check-out setelah check-in.");
      }
      setLoading(false);
    } else {
      router.push("/reservations");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="customerName">Nama Pelanggan</Label>
        <Input id="customerName" name="customerName" required placeholder="Cth: Budi Santoso" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="villaId">Pilih Unit Villa</Label>
        <select 
          id="villaId" 
          name="villaId" 
          required 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">-- Pilih Villa --</option>
          {villas.map(v => (
            <option key={v.id} value={v.id}>
              {v.name} - Rp {Number(v.price).toLocaleString('id-ID')}/malam
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checkIn">Tanggal Check-in</Label>
          <Input id="checkIn" name="checkIn" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkOut">Tanggal Check-out</Label>
          <Input id="checkOut" name="checkOut" type="date" required />
        </div>
      </div>

      <Button type="submit" className="w-full mt-6" disabled={loading}>
        {loading ? "Menyimpan..." : "Buat Reservasi"}
      </Button>
    </form>
  );
}
