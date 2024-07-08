import { Request, Response, Router } from 'express';
import { UserService } from '../services/user.service';

const router = Router();
const userService = new UserService();

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password, roles } = req.body;

    try {
        const user = await userService.createUser(username, email, password, roles);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

export const userController = router;
