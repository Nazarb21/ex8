import { Request, Response, Router } from 'express';
import { UserService } from '../services/user.service';
import { body, validationResult } from 'express-validator';

const router = Router();
const userService = new UserService();

router.post(
    '/register',
    [
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('email').isEmail().withMessage('Must be a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('roles').isArray().withMessage('Roles must be an array')
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, roles } = req.body;

        try {
            const user = await userService.createUser(username, email, password, roles);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
);

export const userController = router;
