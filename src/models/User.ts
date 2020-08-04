import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({ select: false, type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ select: false, type: "timestamptz" })
  updatedAt: Date;

  @Column({ nullable: true, select: false })
  deletedAt: Date;
}
