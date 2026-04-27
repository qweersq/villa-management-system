import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ReservationForm } from "@/components/ReservationForm";
import { redirect } from "next/navigation";

export default async function EditReservationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const reservation = await prisma.reservation.findUnique({
    where: { id }
  });

  if (!reservation) {
    redirect("/reservations");
  }

  const villas = await prisma.villa.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Reservasi</h1>
        <Link href="/reservations">
          <Button variant="outline">Batal</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Reservasi</CardTitle>
          <CardDescription>
            Sistem otomatis akan menolak jika tanggal baru yang dipilih bersinggungan (overlapping) dengan reservasi lain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReservationForm 
            villas={villas.map(v => ({ ...v, price: Number(v.price) }))} 
            reservation={reservation} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
