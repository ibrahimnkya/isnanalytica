import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['organization', 'branch', 'department']
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['organization', 'branch', 'department']
        });
    }

    async findByResetToken(token: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { resetToken: token }
        });
    }

    async findAllByOrganization(organizationId: string): Promise<User[]> {
        return this.usersRepository.find({
            where: { organization: { id: organizationId } },
            relations: ['branch', 'department'],
            order: { createdAt: 'DESC' }
        });
    }

    async create(data: Partial<User>): Promise<User> {
        if (data.passwordHash) {
            const salt = await bcrypt.genSalt();
            data.passwordHash = await bcrypt.hash(data.passwordHash, salt);
        }

        const newUser = this.usersRepository.create(data);
        return this.usersRepository.save(newUser);
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        if (data.passwordHash) {
            const salt = await bcrypt.genSalt();
            data.passwordHash = await bcrypt.hash(data.passwordHash, salt);
        }

        await this.usersRepository.update(id, data);
        const updatedUser = await this.findById(id);
        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
