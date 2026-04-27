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
import { deleteVilla } from "@/app/actions";
import { Edit, Trash } from "lucide-react";

export default async function VillasPage() {
  const villas = await prisma.villa.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola Unit Villa</h1>
          <p className="text-muted-foreground">Daftar unit villa yang tersedia untuk disewa.</p>
        </div>
        <Link href="/villas/new">
          <Button>Tambah Unit</Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Harga/Malam</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {villas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  Belum ada data villa.
                </TableCell>
              </TableRow>
            ) : (
              villas.map((villa) => (
                <TableRow key={villa.id}>
                  <TableCell className="font-medium">{villa.name}</TableCell>
                  <TableCell>{villa.location}</TableCell>
                  <TableCell>Rp {Number(villa.price).toLocaleString('id-ID')}</TableCell>
                  <TableCell>{villa.capacity} Orang</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Link href={`/villas/${villa.id}/edit`} title="Edit Villa">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form action={deleteVilla.bind(null, villa.id)}>
                      <Button variant="destructive" size="icon" className="h-8 w-8" type="submit" title="Hapus Villa">
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
