import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages } from './entities/product_images.entity';
import { ProductImagesService } from './product_images.service';
import { ProductImagesController } from './product_images.controller';
import { ProductsModule } from '../products/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImages]), ProductsModule],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
  exports: [ProductImagesService],
})
export class ProductImagesModule {}
