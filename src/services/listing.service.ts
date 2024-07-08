import { getRepository } from 'typeorm';
import { Listing } from '../models/listing.model';
import { User } from '../models/user.model';

export class ListingService {
    private listingRepository = getRepository(Listing);

    async createListing(listingData: Partial<Listing>, user: User): Promise<Listing> {
        const listing = this.listingRepository.create({ ...listingData, user });
        return this.listingRepository.save(listing);
    }

    async getListings(): Promise<Listing[]> {
        return this.listingRepository.find();
    }

    async getListingById(id: number): Promise<Listing | undefined> {
        return this.listingRepository.findOne(id);
    }

    async updateListing(id: number, listingData: Partial<Listing>): Promise<Listing> {
        await this.listingRepository.update(id, listingData);
        return this.getListingById(id);
    }

    async deleteListing(id: number): Promise<void> {
        await this.listingRepository.delete(id);
    }
}
