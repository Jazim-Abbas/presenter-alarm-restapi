import { IsMongoId } from "class-validator";

export class FindOneParam {
  @IsMongoId({ message: "Not a valid id" })
  id: string;
}
