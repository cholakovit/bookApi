import { injectable } from "tsyringe";
import { UserRepository } from "./Repository";
import { User } from "./User";


@injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(name: string, email: string, password: string, role: string) {
        const roleAsNumber = role ? Number(role) : 0;
        if (isNaN(roleAsNumber)) {
            throw new Error("Invalid role value: role must be a valid number or not provided.");
        }
        
        return await this.userRepository.createUser(name, email, password, roleAsNumber)
    }

    async getUsers() {
        const users = await this.userRepository.getUsers()
        if(!users.length) {
            throw new Error("No users found")
        }
        return users
    }

    async getUserById(id: number) {
        const user = await this.userRepository.getUserById(id)
        return user
    }

    async updateUser(id: number, updateData: Partial<User>) {
        const user = await this.userRepository.getUserById(id)
        if(!user) {
            throw new Error("User not found")
        }
        return await this.userRepository.updateUser(id, updateData)
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.getUserById(id)
        if(!user) {
            throw new Error("User not found")
        }
        return await this.userRepository.deleteUser(id)
    }
}