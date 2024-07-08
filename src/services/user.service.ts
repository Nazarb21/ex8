import { getRepository } from 'typeorm';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import * as bcrypt from 'bcryptjs';

export class UserService {
    private userRepository = getRepository(User);
    private roleRepository = getRepository(Role);

    async createUser(username: string, email: string, password: string, roleNames: string[]): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ username, email, password: hashedPassword });

        const roles = await this.roleRepository.find({ where: { name: roleNames } });
        user.roles = roles;

        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }
}
