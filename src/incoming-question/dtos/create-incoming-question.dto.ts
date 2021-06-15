import { IsMongoId } from "class-validator";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";

export class CreateIncomingQuestionDto extends CreateQuestionDto {
  @IsMongoId()
  questionId: string;
}
