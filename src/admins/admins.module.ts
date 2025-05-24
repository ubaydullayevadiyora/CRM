import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./model/admin.model";
import { AdminService } from "./admins.service";
import { AdminController } from "./admins.controller";
import { AuthModule } from "../auth/auth.module";
import { TeacherModule } from "../teacher/teacher.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    forwardRef(() => AuthModule), // ✅ circular fix
    forwardRef(() => TeacherModule), // ✅ circular fix
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secretKey",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
