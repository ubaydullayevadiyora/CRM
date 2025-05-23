import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./model/admin.model";
import { AdminService } from "./admins.service";
import { AdminController } from "./admins.controller";

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
