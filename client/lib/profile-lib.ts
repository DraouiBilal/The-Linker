import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import {
    updateProfileDTO,
    updateProfileResponseDTO,
    User,
} from "../DTO/profile-dto";
import { ImageConverter } from "../utils/ImageConverter";
import Links from "../utils/links";

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateUpdateForm = async (user: User) => {
    const updateProfileDto = await Swal.fire({
        html: `<input type="text" autocomplete="off" value=${user.lastname} id="lastname" class="form-control mt-2" placeholder="last name">
                   <input type="text" autocomplete="off" value=${user.firstname} id="firstname" class="form-control mt-2" placeholder="first name">
                   <input type="text" autocomplete="off" value=${user.username} id="username" class="form-control mt-2" placeholder="username">
                   <input type="email" autocomplete="off" value=${user.email} id="email" class="form-control mt-2" placeholder="email">
                   <input type="password" autocomplete="off" id="password" class="form-control mt-2 mb-2" placeholder="password">
                   <input type="file" autocomplete="off" id="avatar" class="form-control form-control-sm" placeholder="avatar">`,
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        focusConfirm: false,
        allowOutsideClick: false,
        preConfirm: () => {
            let errors: string[] = [];
            const lastname = (
                document.getElementById("lastname")! as HTMLInputElement
            ).value;
            const firstname = (
                document.getElementById("firstname")! as HTMLInputElement
            ).value;
            const username = (
                document.getElementById("username")! as HTMLInputElement
            ).value;
            const email = (
                document.getElementById("email")! as HTMLInputElement
            ).value;
            const password = (
                document.getElementById("password")! as HTMLInputElement
            ).value;
            const avatar = (
                document.getElementById("avatar")! as HTMLInputElement
            ).files;
            if (lastname.trim().length === 0) {
                errors.push("last name");
            }
            if (firstname.trim().length === 0) {
                errors.push("first name");
            }
            if (username.trim().length === 0) {
                errors.push("username");
            }
            if (email.trim().length === 0) {
                errors.push("email");
            }
            if (errors.length > 0) {
                const verb: string = errors.length == 1 ? "is" : "are";
                const message: string = errors.join(",") + ` ${verb} missing`;
                Swal.showValidationMessage(`${message}`);
            } else {
                if (!email.match(EMAIL_REGEX)) {
                    Swal.showValidationMessage(
                        "you should type a valid email address"
                    );
                } else {
                    let updateProfileDto: updateProfileDTO = {
                        lastname: "",
                        firstname: "",
                        username: "",
                        email: "",
                        password: undefined,
                        avatar: "",
                    };
                    updateProfileDto.lastname = lastname;
                    updateProfileDto.firstname = firstname;
                    updateProfileDto.username = username;
                    updateProfileDto.email = email;
                    if (password.trim().length !== 0) {
                        updateProfileDto.password = password;
                    }
                    if (avatar && avatar.length !== 0) {
                        updateProfileDto.avatar =
                            ImageConverter.ConvertToString(avatar[0]);
                    }

                    console.log("avatar to update", updateProfileDto.avatar);
                    return updateProfileDto;
                }
            }
        },
    });
    return updateProfileDto;
};

export const getUser = async (accessToken: string): Promise<User | null> => {
    try {
        const response = await axios.get(Links.GET_PROFILE_LINK, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.user as User;
    } catch (error: unknown) {
        return null;
    }
};

export const updateProfile = async (
    updateProfileDto: updateProfileDTO,
    accessToken: string
): Promise<updateProfileResponseDTO> => {
    try {
        const response = await axios.put(
            Links.UPDATE_PROFILE_LINK,
            updateProfileDto,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        console.log("response", response.data.user);
        return {
            user: response.data.user,
            errors: [],
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                user: null,
                errors: [error.response!.data.message],
            };
        }
        return {
            user: null,
            errors: ["An Error has occurred"],
        };
    }
};
