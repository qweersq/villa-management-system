import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ReservationForm } from "@/components/ReservationForm";

export default async function NewReservationPage() {
  const villas = await prisma.villa.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Booking Baru</h1>
        <Link href="/reservations">
          <Button variant="outline">Batal</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Reservasi</CardTitle>
          <CardDescription>
            Sistem otomatis akan menolak jika tanggal saling bersinggungan (overlapping) untuk villa yang sama.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReservationForm villas={villas.map(v => ({ ...v, price: Number(v.price) }))} />
        </CardContent>
      </Card>
    </div>
  );
}
