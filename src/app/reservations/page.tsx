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
import { deleteReservation } from "@/app/actions";
import { Edit, Trash, User } from "lucide-react";

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
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  Belum ada data reservasi.
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((res) => (
                <TableRow key={res.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-4 w-4" />
                      </div>
                      {res.customerName}
                    </div>
                  </TableCell>
                  <TableCell>{res.villa.name}</TableCell>
                  <TableCell>{res.checkIn.toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>{res.checkOut.toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>{res.createdAt.toLocaleDateString('id-ID')}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Link href={`/reservations/${res.id}/edit`} title="Edit Reservasi">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form action={deleteReservation.bind(null, res.id)}>
                      <Button variant="destructive" size="icon" className="h-8 w-8" type="submit" title="Hapus Reservasi">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
