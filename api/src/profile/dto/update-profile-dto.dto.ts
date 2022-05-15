import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { UserInterface } from '../../auth/interfaces/user.interfaces';

export class UpdateProfileDto implements Partial<UserInterface> {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(8, 25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
