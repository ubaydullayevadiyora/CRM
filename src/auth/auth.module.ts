import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Admin } from "../admins/model/admin.model";
import { AdminModule } from "../admins/admins.module";
import { TeacherModule } from "../teacher/teacher.module";
import { StudentsModule } from "../students/students.module";
import { Student } from "../students/entities/student.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Teacher, Student]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secretKey",
      signOptions: { expiresIn: "1d" },
    }),
    forwardRef(() => AdminModule),
    forwardRef(() => TeacherModule),
    forwardRef(() => StudentsModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
