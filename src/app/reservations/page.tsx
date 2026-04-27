import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default async function ReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    include: { villa: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daftar Reservasi</h1>
          <p className="text-muted-foreground">Kelola semua booking villa dari pelanggan.</p>
        </div>
        <Link href="/reservations/new">
          <Button>Buat Reservasi Baru</Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Pelanggan</TableHead>
              <TableHead>Unit Villa</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Tanggal Booking</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  Belum ada data reservasi.
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((res) => (
                <TableRow key={res.id}>
                  <TableCell className="font-medium">{res.customerName}</TableCell>
                  <TableCell>{res.villa.name}</TableCell>
                  <TableCell>{res.checkIn.toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>{res.checkOut.toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>{res.createdAt.toLocaleDateString('id-ID')}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
