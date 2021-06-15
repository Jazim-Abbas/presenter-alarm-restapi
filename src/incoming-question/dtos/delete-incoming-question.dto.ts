import { IsMongoId } from "class-validator";

export class DeleteIncomingQuestionDto {
  @IsMongoId({ message: "Must be valid id " })
  questionId: string;

  @IsMongoId()
  projectId: string;
}
