export type updateProfileDTO = {
    lastname: string;
    firstname: string;
    username: string;
    email: string;
    password: string | undefined;
    avatar: string;
};
export type updateProfileResponseDTO = {
    user: User | null;
    errors: string[];
};
export type User = {
    id: string;
    lastname: string;
    firstname: string;
    username: string;
    email: string;
    password: string | undefined;
    avatar: string;
    connected: boolean;
};
