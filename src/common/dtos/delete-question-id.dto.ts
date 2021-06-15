import { IsMongoId } from "class-validator";

export class DeleteQuestionIdDto {
  @IsMongoId({ message: "Must be valid id" })
  questionId: string;

  @IsMongoId({ message: "Must be valid id" })
  projectId: string;
}
