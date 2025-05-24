import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["lecturer", "assistant"],
    default: "lecturer",
  })
  role: "lecturer" | "assistant";

  @Column({ default: true })
  is_active: boolean;
}
