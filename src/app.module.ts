import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./admins/model/admin.model";
import { Teacher } from "./teacher/entities/teacher.entity";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admins/admins.module";
import { TeacherModule } from "./teacher/teacher.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres", // yoki 'mysql', 'sqlite', va h.k.
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "crm",
      entities: [Admin, Teacher],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Admin, Teacher]), // Bu ham kerak!
    AuthModule,
    AdminModule,
    TeacherModule,
  ],
})
export class AppModule {}
