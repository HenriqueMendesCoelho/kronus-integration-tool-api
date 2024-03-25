import { User } from '../../models/User';
import { IUserRepository } from '../IUserRepository';
import { prisma } from '../prisma/PrismaClient';

export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User> {
    try {
      const obj = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      return obj || null;
    } catch (error) {
      throw Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  async findAll(): Promise<User[]> {
    try {
      const obj = await prisma.user.findMany();

      return obj || null;
    } catch (error) {
      throw Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  async save(user: User): Promise<User> {
    try {
      const obj = await prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          password: user.password,
          salt: user.salt,
        },
      });

      return obj || null;
    } catch (error) {
      throw Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  async update(username: string, user: User): Promise<User> {
    try {
      const obj = await prisma.user.update({
        where: {
          username,
        },
        data: {
          username: user.username,
          password: user.password,
          salt: user.salt,
        },
      });

      return obj || user;
    } catch (error) {
      throw Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
