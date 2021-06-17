import { IsMongoId, IsString, MinLength } from "class-validator";

export class CreateRemarkDto {
  @IsMongoId({ message: "Must be valid id" })
  projectId: string;

  @IsString()
  @MinLength(5)
  description: string;
}
