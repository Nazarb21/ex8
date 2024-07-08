import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.model';

@Entity()
export class Listing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    currency: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    mileage: number;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.listings)
    user: User;
}
