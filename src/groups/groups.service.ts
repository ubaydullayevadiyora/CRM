import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";
import { CreateGroupInput } from "./dto/create-group.dto";
import { UpdateGroupInput } from "./dto/update-group.dto";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepo: Repository<Group>
  ) {}

  create(data: CreateGroupInput): Promise<Group> {
    return this.groupRepo.save(data);
  }

  findAll(): Promise<Group[]> {
    return this.groupRepo.find();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepo.findOneBy({ id });
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    return group;
  }

  async update(id: number, data: UpdateGroupInput): Promise<Group> {
    await this.groupRepo.update(id, data);
    return this.findOne(id); // qayta tekshiradi, null bo'lishi mumkin
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.groupRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    return true;
  }
}
