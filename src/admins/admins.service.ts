import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./model/admin.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(dto: CreateAdminDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.adminModel.create({ ...dto, password: hashed });
  }

  async findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException("Admin not found");
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    return admin.update(dto);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    return admin.destroy();
  }
}
