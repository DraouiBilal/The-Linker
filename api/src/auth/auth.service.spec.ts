import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { NeodeModule } from 'neode-nestjs/dist';
import * as Neode from 'neode';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import UserSchema from './dto/user.model';
import { UserInterface } from './interfaces/user.interfaces';
import { ConflictException } from '@nestjs/common';

const deleteGoodUser = async () => {
  const instance = Neode.fromEnv().with({User:UserSchema});
  const goodUser:Neode.Node<UserInterface> = await instance.first('User','username','UserName')
  
  if(goodUser){
    instance.delete(goodUser)
  }
}

const mockGoodUser:SignupCredentialsDto = {
  firstname: 'testFirstName',
  lastname: 'testLastName',
  username: 'UserName',
  password: 'A.abc@12345',
  email: 'test@gmail.com'
}



describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports:[
        NeodeModule.forFeature({User:UserSchema}),
        JwtModule.register({
          secret: ""+process.env.JWT_SECRET,
          signOptions:{
              expiresIn: 3600 * 24 * 7 // 7 days 
          }
      }),],
      providers: [
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('Calls the AuthService.signup and returns the token',async () => {
      await deleteGoodUser()
      await expect(service.signup(mockGoodUser)).resolves.not.toThrow();
      
      await deleteGoodUser()
      await expect(service.signup(mockGoodUser)).resolves.toEqual({
        accessToken: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      })
    })

    it('Calls the AuthService.signup and reject the repeated user', async () => {
      await expect(service.signup(mockGoodUser)).rejects.toThrow(ConflictException)
    })
  })
});
