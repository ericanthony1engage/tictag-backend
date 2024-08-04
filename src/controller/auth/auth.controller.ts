import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import {
  JsonResponseDto,
  JsonResponseUtil,
} from '../../utils/json-response.util';
import { LoginRequestDto, LoginResponseDto } from '../../dto/auth/login.dto';
import { USER_ROLES } from '../../enum/role';
import { LoginValidationPipe } from '../../pipes/login.pipes';
import { RefreshTokenRequestDto } from '../../dto/auth/refresh-token.dto';
import { RefreshValidationPipe } from '../../pipes/refresh.pipes';
import { RegisterValidationPipe } from '../../pipes/register.pipes';
import { RegisterRequestDto } from '../../dto/auth/register.dto';
import { SwaggerUtil } from '../../utils/swagger.util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @UsePipes(LoginValidationPipe)
  @Post('/login')
  @SwaggerUtil({
    summary: 'Customer or Staff login api',
    bodyType: LoginRequestDto,
    successResponse: {
      type: LoginResponseDto,
    },
  })
  public async login(
    @Body() req: LoginRequestDto,
  ): Promise<JsonResponseDto<LoginResponseDto>> {
    const response: LoginResponseDto = await this._authService.login(req);
    return new JsonResponseUtil<LoginResponseDto>()
      .setData(response)
      .toPlainObject();
  }

  @UsePipes(RefreshValidationPipe)
  @Post('/refresh')
  @SwaggerUtil({
    summary: 'Generating new access token using refresh token',
    bodyType: RefreshTokenRequestDto,
    successResponse: {
      type: LoginResponseDto,
    },
  })
  public async refresh(@Body() req: RefreshTokenRequestDto) {
    const response: LoginResponseDto = await this._authService.refresh(
      req.refresh_token,
    );
    return new JsonResponseUtil<LoginResponseDto>()
      .setData(response)
      .toPlainObject();
  }

  @UsePipes(RegisterValidationPipe)
  @Post('/register/customer')
  @SwaggerUtil({
    summary: 'Customer registration api',
    bodyType: RefreshTokenRequestDto,
    successResponse: {
      type: null,
    },
  })
  public async registerCustomer(
    @Body() req: RegisterRequestDto,
  ): Promise<JsonResponseDto<null>> {
    await this._authService.register({
      username: req.username,
      password: req.password,
      role: USER_ROLES.CUSTOMER,
    });

    return new JsonResponseUtil<null>().toPlainObject();
  }

  @UsePipes(RegisterValidationPipe)
  @Post('/register/staff')
  @SwaggerUtil({
    summary: 'Staff registration api',
    bodyType: RefreshTokenRequestDto,
    successResponse: {
      type: null,
    },
  })
  public async registerStaff(
    @Body() req: RegisterRequestDto,
  ): Promise<JsonResponseDto<null>> {
    await this._authService.register({
      username: req.username,
      password: req.password,
      role: USER_ROLES.STAFF,
    });

    return new JsonResponseUtil<null>().toPlainObject();
  }
}
