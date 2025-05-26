import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./admins/model/admin.model";
import { Teacher } from "./teacher/entities/teacher.entity";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admins/admins.module";
import { TeacherModule } from "./teacher/teacher.module";
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { TeacherGroupsModule } from "./teacher_group/teacher_group.module";
import { Student } from "./students/entities/student.entity";
import { SchedulesModule } from './schedules/schedules.module';
import { StudentGroupsModule } from "./student_group/student_group.module";
import { AttendancesModule } from "./attendance/attendance.module";

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
    TypeOrmModule.forFeature([Admin, Teacher, Student]), 
    AuthModule,
    AdminModule,
    TeacherModule,
    StudentsModule,
    CoursesModule,
    GroupsModule,
    TeacherGroupsModule,
    StudentGroupsModule,
    SchedulesModule,
    AttendancesModule,
  ],
})
export class AppModule {}
