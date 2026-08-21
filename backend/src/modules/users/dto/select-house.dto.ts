import { IsEnum, IsNotEmpty } from 'class-validator';
import { HouseType } from '../../../schemas/user.schema';

export class SelectHouseDto {
  @IsNotEmpty()
  @IsEnum(['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'])
  house: HouseType;
}
