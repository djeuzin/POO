import { Rent } from "../rent";
import { RentRepo } from "../ports/rent-repo";
import prisma from "./db";

export class PrismaRentRepo implements RentRepo {
    async add(rent: Rent): Promise<string> {
        const newRent = await prisma.rents.create({
            data: { ...rent }
        });
        return newRent.id;
    }

    async findOpen(bikeId: string, userEmail: string): Promise<Rent | null> {
        return await prisma.rents.findFirst({
            where: { 
                bikeId: bikeId,
                userEmail: userEmail,
                end: undefined
            }
        })
    }

    async update(id: string, rent: Rent): Promise<void> {
        await prisma.rents.update({
            where: { id }, data: { ...rent }
        })
    }

    async findOpenRent(email: string): Promise<boolean> {
        const rent = await prisma.rents.findFirst({
            where: { 
                userEmail: email,
                end: undefined
            }
        })
        if (rent) {
            return true;
        } else {
            return false;
        }
    }
}