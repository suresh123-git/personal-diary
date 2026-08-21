import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AskPensieveDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  @IsOptional()
  @IsString()
  conversationId?: string;
}
