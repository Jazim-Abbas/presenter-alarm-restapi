import { OmitType, PartialType } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
import { CreateRemarkDto } from "./create-remark.dto";

export class UpdateRemarkDto extends PartialType(
  OmitType(CreateRemarkDto, ["projectId" as const])
) {
  @IsMongoId({ message: "Must be valid id" })
  remarkId: string;
}
