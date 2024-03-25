import { ApiKey } from '../../models/ApiKey';
import { IApiKeyRepository } from '../IApiKeyRepository';
import { prisma } from '../prisma/PrismaClient';

export class ApiKeyRepository implements IApiKeyRepository {
  async findByKey(key: string): Promise<ApiKey> | null {
    try {
      const obj = await prisma.apiKey.findFirst({
        where: {
          key: key,
        },
      });

      return obj || null;
    } catch (error) {
      throw new Error(error || 'Error during apikey query');
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll(): Promise<Array<ApiKey>> {
    try {
      return prisma.apiKey.findMany();
    } catch (error) {
      throw new Error(error || 'Error during apikey query');
    } finally {
      await prisma.$disconnect();
    }
  }

  async save(apikey: ApiKey): Promise<ApiKey> {
    try {
      return prisma.apiKey.create({
        data: {
          key: apikey.key,
          name: apikey.name,
        },
      });
    } catch (error) {
      throw new Error(error || 'Error during apikey creation');
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(name: string): Promise<void> {
    try {
      await prisma.apiKey.delete({
        where: {
          name: name,
        },
      });
      return;
    } catch (error) {
      throw new Error(error || 'Error during apikey deletion');
    } finally {
      await prisma.$disconnect();
    }
  }
}
