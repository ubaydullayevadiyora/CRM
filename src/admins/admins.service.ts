import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Admin } from "./model/admin.model";
import { AuthService } from "../auth/auth.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private repoAdmin: Repository<Admin>,
    private authService: AuthService
  ) {}

  async create(dto: CreateAdminDto) {
    const hashedPassword = await this.authService.hashPassword(dto.password);
    const admin = this.repoAdmin.create({ ...dto, password: hashedPassword });
    return this.repoAdmin.save(admin);
  }

  findAll() {
    return this.repoAdmin.find();
  }

  findOne(id: number) {
    return this.repoAdmin.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateAdminDto) {
    return this.repoAdmin.update(id, dto);
  }

  remove(id: number) {
    return this.repoAdmin.delete(id);
  }

  async login(email: string, password: string) {
    const admin = await this.repoAdmin.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException("User not found");

    const match = await this.authService.comparePassword(
      password,
      admin.password
    );
    if (!match) throw new UnauthorizedException("Wrong password");

    return this.authService.generateToken({
      sub: admin.id,
      email: admin.email,
      role: "admin",
    });
  }
}
