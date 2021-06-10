import { IsBoolean, IsOptional } from "class-validator";

export class ModeratorPermissionDto {
  @IsBoolean()
  @IsOptional()
  isViewEnable?: boolean;

  @IsBoolean()
  @IsOptional()
  canPlaceRemarks?: boolean;

  @IsBoolean()
  @IsOptional()
  canEditRemarks?: boolean;

  @IsBoolean()
  @IsOptional()
  canEditQuestions?: boolean;
}
