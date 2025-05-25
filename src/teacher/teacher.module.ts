import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { AdminModule } from "../admins/admins.module";
import { JwtModule } from "@nestjs/jwt";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    forwardRef(() => AuthModule), 
    forwardRef(() => AdminModule), 
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secretKey",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [TeacherService],
})
export class TeacherModule {}
