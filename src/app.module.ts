import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./admins/model/admin.model";
import { Teacher } from "./teacher/entities/teacher.entity";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admins/admins.module";
import { TeacherModule } from "./teacher/teacher.module";
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres", 
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234", 
      database: "crm",
      entities: [Admin, Teacher],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Admin, Teacher]), 
    AuthModule,
    AdminModule,
    TeacherModule,
    StudentsModule,
    CoursesModule,
  ],
})
export class AppModule {}
