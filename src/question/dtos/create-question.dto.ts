import { IsMongoId, IsString, MaxLength, MinLength } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  questionText: string;

  @IsMongoId()
  project: string;
}
