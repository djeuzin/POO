import { Bike } from "../bike"

export interface BikeRepo {
    find(id: string | undefined): Promise<Bike>
    add(bike: Bike): Promise<string>
    remove(id: string): Promise<void>
    update(id: string | undefined, bike: Bike): Promise<void>
    list(): Promise<Bike[]>
}