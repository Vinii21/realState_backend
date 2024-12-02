import { Injectable } from '@nestjs/common';
import { CreateEstateDto } from './dto/create-estate.dto';
import { UpdateEstateDto } from './dto/update-estate.dto';

@Injectable()
export class EstatesService {
  create(createEstateDto: CreateEstateDto) {
    return 'This action adds a new estate';
  }

  findAll() {
    return `This action returns all estates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estate`;
  }

  update(id: number, updateEstateDto: UpdateEstateDto) {
    return `This action updates a #${id} estate`;
  }

  remove(id: number) {
    return `This action removes a #${id} estate`;
  }
}
