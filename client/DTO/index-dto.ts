export type signInCredentialsDTO = {
    email: string;
    password: string;
};
export type singInResponseDTO = {
    accessToken: string;
    errors: string[];
};
export type signUpCredentialsDTO = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
};
export type singUpResponseDTO = {
    accessToken: string;
    errors: string[];
};
