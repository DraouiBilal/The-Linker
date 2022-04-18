import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { NeodeModule } from 'neode-nestjs/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';

describe('AuthController', () => {
  let controller: AuthController;


  const loginCredentialsDTO:LoginCredentialsDTO = {
    email:'akramfares2001@gmail.com',
    password: '123456789',
  };
  const loginCredentialsDTOWithWrongPassword:LoginCredentialsDTO = {
    email:'akramfares2001@gmail.com',
    password: 'dsqdsqdq',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        NeodeModule.forRoot(),
        JwtModule.register({
          secret: ""+process.env.JWT_SECRET,
          signOptions:{
              expiresIn: 3600 * 24 * 7 // 7 days 
          }
      }),],
      controllers: [AuthController],
      providers:[
        AuthService
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('ControllerLogin', async () => {
    // check if the function has recieved the correct login credentials
    await expect(controller.login(loginCredentialsDTO)).resolves.not.toThrow();

    // check if the output the method is an accessToken
    // that match the given pattern ( someting1.something2.something3 )
    await expect(controller.login(loginCredentialsDTO)).resolves.toEqual({
      accessToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    })

    // check if the function has recieved some wrong login credentials
    await expect(controller.login(loginCredentialsDTOWithWrongPassword)).rejects.toThrow();
  });
});
