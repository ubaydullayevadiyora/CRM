import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Admin } from "../admins/model/admin.model";
import { AdminModule } from "../admins/admins.module";
import { TeacherModule } from "../teacher/teacher.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Teacher]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secretKey",
      signOptions: { expiresIn: "1d" },
    }),
    forwardRef(() => AdminModule), // 🔁 oldini olish uchun
    forwardRef(() => TeacherModule), // 🔁 oldini olish uchun
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // ✅ shu joy muhim!
})
export class AuthModule {}
