import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

import ProductLookStyles from '@modules/products/infra/typeorm/entities/ProductsLookStyles';

@Entity('look_styles')
class LookStyle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image}`;
      default:
        return null;
    }
  }

  @Column()
  image: string;

  @OneToMany(
    () => ProductLookStyles,
    product_look_styles => product_look_styles.look_style
  )
  product_look_styles: ProductLookStyles[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default LookStyle;
