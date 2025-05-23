import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "admin", timestamps: false })
export class Admin extends Model<Admin> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare first_name: string;

  @Column({ type: DataType.BIGINT })
  declare last_name: number;

  @Column({ type: DataType.STRING, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare phone: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_creator: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;
}
