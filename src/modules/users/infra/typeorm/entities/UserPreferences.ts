import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_preferences')
class UserPreferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  favorite_color: string;

  @Column()
  favorite_size: string;

  @Column()
  look_style_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserPreferences;
