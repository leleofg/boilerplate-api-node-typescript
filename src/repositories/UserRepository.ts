import { Repository, EntityRepository } from "typeorm";
import { User } from "../models/User";
import { CreateUser, UpdateUser } from "../interfaces/User";
import { onlyNumbers } from "../helpers";
import { hash } from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave(createUser: CreateUser): Promise<User> {
    const user = new User();

    user.name = createUser.name;
    user.email = createUser.email;
    user.password = await hash(createUser.password, 8);
    user.phone = onlyNumbers(createUser.phone);
    user.birthDate = createUser.birthDate;
    return this.manager.save(user);
  }

  async updateAndSave(user: User, updateUser: UpdateUser): Promise<User> {
    user.name = updateUser.name;
    user.phone = updateUser.phone;
    user.birthDate = updateUser.birthDate;
    return this.manager.save(user);
  }

  async ligthDelete(user: User): Promise<void> {
    user.deletedAt = null;
    this.manager.save(user);
  }
}
