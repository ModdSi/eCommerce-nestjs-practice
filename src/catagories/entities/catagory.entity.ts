import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { OneToMany } from 'typeorm';

@Entity('catagories')
export class Catagory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  title: string;

  @Column({ length: 255 })
  describtion: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.catagory)
  products: Product[];
}
