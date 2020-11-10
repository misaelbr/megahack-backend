import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Expose } from 'class-transformer';

import ProductsCategory from './ProductsCategory';

import uploadConfig from '@config/upload';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Expose({ name: 'image_url' })
  getimageUrl(): string | null {
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

  @Column()
  category_id: string;

  @ManyToOne(() => ProductsCategory, category => category.product, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: ProductsCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
