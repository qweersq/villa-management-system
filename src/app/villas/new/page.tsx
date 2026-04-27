import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createVilla } from "@/app/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewVillaPage() {
  async function onSubmit(formData: FormData) {
    'use server';
    const result = await createVilla(formData);
    if (result.success) {
      redirect("/villas");
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tambah Unit Villa</h1>
        <Link href="/villas">
          <Button variant="outline">Batal</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Villa</CardTitle>
          <CardDescription>Masukkan detail unit villa baru.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Villa</Label>
              <Input id="name" name="name" required placeholder="Cth: Villa Mahameru" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Harga per Malam (Rp)</Label>
                <Input id="price" name="price" type="number" required placeholder="500000" min="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Kapasitas (Orang)</Label>
                <Input id="capacity" name="capacity" type="number" required placeholder="4" min="1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi / Alamat</Label>
              <Input id="location" name="location" required placeholder="Cth: Lembang, Bandung" />
            </div>

            <Button type="submit" className="w-full mt-6">Simpan Data Villa</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
