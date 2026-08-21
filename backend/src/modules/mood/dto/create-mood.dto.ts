import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateMoodDto {
  @IsString()
  @IsNotEmpty()
  date: string; // YYYY-MM-DD

  @IsString()
  @IsNotEmpty()
  mood: string; // Ecstatic | Happy | Calm | Neutral | Sad | Angry | Anxious | Tired | Excited

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  intensity?: number;
}
