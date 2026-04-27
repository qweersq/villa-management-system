import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateVilla } from "@/app/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function EditVillaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const villa = await prisma.villa.findUnique({
    where: { id }
  });

  if (!villa) {
    redirect("/villas");
  }

  async function onSubmit(formData: FormData) {
    'use server';
    const result = await updateVilla(id, formData);
    if (result.success) {
      redirect("/villas");
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Unit Villa</h1>
        <Link href="/villas">
          <Button variant="outline">Batal</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Villa</CardTitle>
          <CardDescription>Ubah detail unit villa yang sudah ada.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Villa</Label>
              <Input id="name" name="name" required defaultValue={villa.name} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Harga per Malam (Rp)</Label>
                <Input id="price" name="price" type="number" required defaultValue={Number(villa.price)} min="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Kapasitas (Orang)</Label>
                <Input id="capacity" name="capacity" type="number" required defaultValue={villa.capacity} min="1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi / Alamat</Label>
              <Input id="location" name="location" required defaultValue={villa.location} />
            </div>

            <Button type="submit" className="w-full mt-6">Simpan Perubahan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
