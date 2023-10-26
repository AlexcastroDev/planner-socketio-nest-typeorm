import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Planner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column()
  estimated: number;

  @Unique(["userId"])
  @Column()
  userId: string;
}
