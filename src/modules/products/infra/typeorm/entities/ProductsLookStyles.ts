import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import Product from './Product';
import LookStyle from '@modules/looks/infra/typeorm/entities/LookStyle';

@Entity('products_look_styles')
class ProductLookStyles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column()
  look_styles_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, product => product.product_look_styles)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => LookStyle, look_style => look_style.product_look_styles)
  @JoinColumn({ name: 'look_styles_id' })
  look_style: LookStyle;
}

export default ProductLookStyles;
