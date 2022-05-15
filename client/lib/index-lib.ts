import axios, { AxiosError } from "axios";
import {
    signInCredentialsDTO,
    signUpCredentialsDTO,
    singInResponseDTO,
} from "../DTO/index-dto";
import Links from "../utils/links";

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const signIn = async (
    signInCredentialsDto: signInCredentialsDTO
): Promise<singInResponseDTO> => {
    const { email, password } = signInCredentialsDto;
    const errors: string[] = [];
    if (email.length === 0) {
        errors.push("email cannot be empty");
    }
    if (password.length === 0) {
        errors.push("password cannot be empty");
    }
    if (errors.length !== 0) {
        return {
            accessToken: "",
            errors: errors,
        };
    }
    try {
        const response = await axios.post(
            Links.LOGIN_LINK,
            signInCredentialsDto
        );
        return {
            accessToken: response.data.accessToken,
            errors: [],
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                accessToken: "",
                errors: [error.response!.data.message],
            };
        }
        return {
            accessToken: "",
            errors: ["An Error has occurred"],
        };
    }
};
export const singUp = async (
    signUpCredentialsDto: signUpCredentialsDTO
): Promise<singInResponseDTO> => {
    const { lastname, firstname, username, email, password } =
        signUpCredentialsDto;
    const errors: string[] = [];
    if (lastname.trim().length === 0) {
        errors.push("lastname could not be empty");
    }
    if (firstname.trim().length === 0) {
        errors.push("firstname could not be empty");
    }
    if (username.trim().length === 0) {
        errors.push("username could not be empty");
    }
    if (email.trim().length === 0) {
        errors.push("email could not be empty");
    }
    if (password.trim().length === 0) {
        errors.push("password could not be empty");
    }
    if (!email.match(EMAIL_REGEX)) {
        errors.push("email must be a valid one");
    }
    if (password.length < 8) {
        errors.push("password must be at least 8 characters");
    }
    if (errors.length > 0) {
        return {
            accessToken: "",
            errors: errors,
        };
    }
    try {
        const response = await axios.post(
            Links.REGISTER_LINK,
            signUpCredentialsDto
        );
        return {
            accessToken: response.data.accessToken,
            errors: [],
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                accessToken: "",
                errors: [error.response!.data.message],
            };
        }
        return {
            accessToken: "",
            errors: ["An Error has occurred"],
        };
    }
};
