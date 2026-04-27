import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const totalVillas = await prisma.villa.count();
  const totalReservations = await prisma.reservation.count();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan sistem manajemen villa Anda.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Unit Villa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVillas}</div>
            <p className="text-xs text-muted-foreground pt-1">
              Unit terdaftar di sistem
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reservasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReservations}</div>
            <p className="text-xs text-muted-foreground pt-1">
              Booking sepanjang masa
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 pt-4">
        <Link href="/villas">
          <Button>Kelola Unit Villa</Button>
        </Link>
        <Link href="/reservations">
          <Button variant="outline">Lihat Reservasi</Button>
        </Link>
      </div>
    </div>
  );
}
