import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { NeodeModule } from 'neode-nestjs/dist';
import { AuthService } from './auth.service';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import { UserInterface } from './interfaces/user.interfaces';

describe('AuthService', () => {
  let service: AuthService;

  const loginCredentialsDTO:LoginCredentialsDTO = {
    email:'akramfares2001@gmail.com',
    password: '123456789é',
  };
  const user:UserInterface = {
    id:'someid',
    firstname:"Akram",
    lastname:"FARES",
    username:"F.Akram",
    email:"akramfares2001@gmail.com",
    avatar:"avatarOfAkram",
    isFirstAuth:true,
    password:"password"
  }
  // const mockJwtService = {
  //   sign:new JwtService().sign
  // };
  // const mockAuthService = {
  //   login: jest.fn((loginCredentialsDTO:LoginCredentialsDTO) => {
  //     const { email, password } = loginCredentialsDTO
  //     if ( email != user.email )
  //       return null;
  //     if ( password != user.password )
  //       return null;
  //     const payload: JwtPayload = { "id": user.id };
  //     const accessToken: string = "someAccessToken"+payload;
  //     return { accessToken }
  //   })
  // }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        NeodeModule.forRoot(),
        JwtModule.register({
          secret: "TgupWCOcVOIVVNqE",
          signOptions:{
              expiresIn: 3600 * 24 * 7 // 7 days 
          }
      }),],
      providers: [
        AuthService,
      ],
    }).compile();
      // .overrideProvider(AuthService).useValue(mockAuthService).compile();

      service = module.get<AuthService>(AuthService);
  });

  it('testLogin', async () => {
    // expect(service.login).not.toHaveBeenCalled();
    // expect(true).toEqual(true);
    await expect(service.login(loginCredentialsDTO)).resolves.not.toThrow();
    await expect(service.login(loginCredentialsDTO)).resolves.toEqual({
      accessToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    })
  });
});
