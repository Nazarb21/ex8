import { Request, Response, Router } from 'express';
import { ListingService } from '../services/listing.service';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const listingService = new ListingService();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const listing = await listingService.createListing(req.body, req.user);
        res.json(listing);
    } catch (error) {
        res.status(500).json({ message: 'Error creating listing' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const listings = await listingService.getListings();
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching listings' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const listing = await listingService.getListingById(parseInt(req.params.id));
        res.json(listing);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching listing' });
    }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const listing = await listingService.updateListing(parseInt(req.params.id), req.body);
        res.json(listing);
    } catch (error) {
        res.status(500).json({ message: 'Error updating listing' });
    }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        await listingService.deleteListing(parseInt(req.params.id));
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting listing' });
    }
});

export const listingController = router;
