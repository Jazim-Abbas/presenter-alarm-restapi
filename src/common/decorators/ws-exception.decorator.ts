import { UseInterceptors } from "@nestjs/common";
import { CatchWSExceptionInterceptor } from "../interceptors/ws-exception.interceptor";

export const WSExceptionInterceptor = () =>
  UseInterceptors(CatchWSExceptionInterceptor);
