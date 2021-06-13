import {
  IsDate,
  IsDateString,
  IsMilitaryTime,
  IsString,
  MaxLength,
  MinDate,
  MinLength,
} from "class-validator";

export class CreateProjectDto {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsDateString()
  scheduleDate: Date;

  @IsMilitaryTime()
  startTime: string;

  @IsMilitaryTime()
  endTime: string;
}
