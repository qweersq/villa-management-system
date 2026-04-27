import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const totalVillas = await prisma.villa.count();
  const totalReservations = await prisma.reservation.count();
  
  const featuredVillas = await prisma.villa.findMany({
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  const DEFAULT_IMAGE = "https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-modern-luxury-villa-with-pool-and-palm-trees-clipart-png-image_12616616.png";

  return (
    <div className="space-y-8">
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

      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Villa Unggulan</h2>
          <Link href="/villas">
            <Button variant="link">Lihat Semua</Button>
          </Link>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {featuredVillas.map((villa) => (
            <Card key={villa.id} className="overflow-hidden flex flex-col group hover:shadow-md transition-all">
              <div className="h-48 w-full bg-slate-100 overflow-hidden relative">
                <img 
                  src={villa.imageUrl || DEFAULT_IMAGE} 
                  alt={villa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{villa.name}</CardTitle>
                <CardDescription>{villa.location}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-lg font-bold text-primary">Rp {Number(villa.price).toLocaleString('id-ID')}<span className="text-sm font-normal text-muted-foreground">/malam</span></p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 rounded-md">{villa.capacity} Orang</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {featuredVillas.length === 0 && (
            <div className="col-span-3 text-center py-12 border border-dashed rounded-lg bg-white">
              <p className="text-muted-foreground">Belum ada unit villa. Tambahkan sekarang!</p>
              <Link href="/villas/new">
                <Button className="mt-4">Tambah Unit Villa</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
