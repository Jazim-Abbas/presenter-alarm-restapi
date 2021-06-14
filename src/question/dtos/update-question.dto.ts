import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsMongoId } from "class-validator";
import { CreateQuestionDto } from "./create-question.dto";

export class UpdateQuestionDto extends PartialType(
  OmitType(CreateQuestionDto, ["project"] as const)
) {
  @IsMongoId()
  id: string;
}
