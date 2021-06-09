import { IsBoolean, IsOptional } from "class-validator";

export class CreatePresenterPermissionDto {
  @IsBoolean()
  @IsOptional()
  isTimeVisible?: boolean;

  @IsBoolean()
  @IsOptional()
  isCommentingPersonNameVisible?: boolean;

  @IsBoolean()
  @IsOptional()
  isStartTimeVisible?: boolean;

  @IsBoolean()
  @IsOptional()
  isRunningTimeVisible?: boolean;

  @IsBoolean()
  @IsOptional()
  isTimeLeftVisible?: boolean;

  @IsBoolean()
  @IsOptional()
  isRemarksVisible?: boolean;

  @IsOptional()
  @IsBoolean()
  isCheckmarkBtnVisible?: boolean;
}
