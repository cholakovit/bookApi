import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { User } from "./User";
import { AppDataSource } from "../ormconfig";

@injectable()
export class UserRepository {
    private userRepository: Repository<User>

    constructor() { 
        this.userRepository = AppDataSource.getRepository(User)
    }

    async createUser(name: string, email: string, password: string, role: number) {
        const user = this.userRepository.create({ name, email, password, role })
        return await this.userRepository.save(user)
    }

    async getUsers() {
        return await this.userRepository.find()
    }

    async getUserById(id: number) {
        return await this.userRepository.findOneBy({ id })
    }

    async updateUser(id: number, updateData: Partial<User>) {
        await this.userRepository.update(id, updateData)
        return await this.userRepository.findOneBy({ id })
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete(id)
        return result.affected !== null && result.affected !== undefined && result.affected > 0 
    }
}


