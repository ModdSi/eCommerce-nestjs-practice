import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('catagories')
export class CatagoriesController {
  constructor(private readonly CatagoriesService: CatagoriesService) {}
  //  1-create()
  // 2-findAll()
  // 3-findOne()
  // 4-update()
  // 5-remove()

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/catagories',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          callback(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() CreateCatagoryDto: CreateCatagoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    image?: Express.Multer.File,
  ) {
    return this.CatagoriesService.create(CreateCatagoryDto, image);
  }
  @Get()
  async findAll(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.CatagoriesService.findAll(offset, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CatagoriesService.findOne(+id);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() UpdateCatagoryDto: Partial<UpdateCatagoryDto>,
  ) {
    return this.CatagoriesService.update(id, UpdateCatagoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.CatagoriesService.remove(id);
  }
}
function callback(arg0: null, arg1: string) {
  throw new Error('Function not implemented.');
}
