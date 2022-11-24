import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  size: number;

  @Column()
  type: string;

  @Column()
  cid: string;

  @Column({ nullable: true })
  sharedLink: string;

  @ManyToOne(() => User)
  user: User;
}
