'use server'

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { VillaSchema, ReservationSchema } from "@/lib/validations";

// ==========================================
// VILLA ACTIONS
// ==========================================

export async function createVilla(formData: FormData) {
  const parsed = VillaSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.flatten() };

  await prisma.villa.create({ data: parsed.data });
  revalidatePath("/villas");

  return { success: true };
}

export async function deleteVilla(id: string) {
  await prisma.villa.delete({ where: { id } });
  revalidatePath("/villas");
}

export async function updateVilla(id: string, formData: FormData) {
  const parsed = VillaSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.flatten() };

  await prisma.villa.update({ where: { id }, data: parsed.data });
  revalidatePath("/villas");

  return { success: true };
}

// ==========================================
// RESERVATION ACTIONS
// ==========================================

export async function createReservation(formData: FormData) {
  const parsed = ReservationSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.flatten() };

  const { villaId, checkIn, checkOut, customerName } = parsed.data;

  // 🔴 CORE LOGIC: Check Overlapping Dates
  const overlap = await prisma.reservation.findFirst({
    where: {
      villaId,
      AND: [
        { checkIn: { lt: checkOut } }, // Check-in DB kurang dari Check-out Baru
        { checkOut: { gt: checkIn } }  // Check-out DB lebih dari Check-in Baru
      ]
    }
  });

  if (overlap) {
    return { error: { fieldErrors: { checkIn: ["Tanggal ini sudah dibooking (overlapping)."] } } };
  }

  // Insert Booking if valid
  await prisma.reservation.create({
    data: { villaId, checkIn, checkOut, customerName }
  });

  revalidatePath("/reservations");

  return { success: true };
}

export async function updateReservation(id: string, formData: FormData) {
  const parsed = ReservationSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.flatten() };

  const { villaId, checkIn, checkOut, customerName } = parsed.data;

  // Check Overlapping Dates, excluding the current reservation
  const overlap = await prisma.reservation.findFirst({
    where: {
      villaId,
      id: { not: id },
      AND: [
        { checkIn: { lt: checkOut } },
        { checkOut: { gt: checkIn } }
      ]
    }
  });

  if (overlap) {
    return { error: { fieldErrors: { checkIn: ["Tanggal ini sudah dibooking (overlapping)."] } } };
  }

  await prisma.reservation.update({
    where: { id },
    data: { villaId, checkIn, checkOut, customerName }
  });

  revalidatePath("/reservations");

  return { success: true };
}

export async function deleteReservation(id: string) {
  await prisma.reservation.delete({ where: { id } });
  revalidatePath("/reservations");
}
