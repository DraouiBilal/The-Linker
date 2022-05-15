export type getAllUsersResponseDTO = {
    users: User[];
    errors: string[];
};
export type getAllPendingRequestResponseDTO = {
    users: User[];
    errors: string[];
};
export type getAllPendingInvitationsResponseDTO = {
    users: User[];
    errors: string[];
};
export type getAllYourFriendsResponseDTO = {
    users: User[];
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
};
