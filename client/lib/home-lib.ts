import axios, { AxiosError } from "axios";
import {
    getAllPendingInvitationsResponseDTO,
    getAllPendingRequestResponseDTO,
    getAllUsersResponseDTO,
    getAllYourFriendsResponseDTO,
} from "../DTO/home-dto";
import Links from "../utils/links";

export const getAllUsers = async (
    accessToken: string
): Promise<getAllUsersResponseDTO> => {
    try {
        const response = await axios.get(Links.GET_ALL_USERS_LINK, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            users: response.data.unknownUsers,
            errors: [],
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                users: [],
                errors: [error.response!.data.message],
            };
        }
        return {
            users: [],
            errors: ["An Error has occurred"],
        };
    }
};

export const getAllPendingRequests = async (
    accessToken: string
): Promise<getAllPendingRequestResponseDTO> => {
    try {
        const response = await axios.get(Links.GET_ALL_PENDING_REQUESTS, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            users: response.data.pendingRequests,
            errors: [],
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                users: [],
                errors: [error.response!.data.message],
            };
        }
        return {
            users: [],
            errors: ["An Error has occurred"],
        };
    }
};

export const getAllPendingInvitations = async (
    accessToken: string
): Promise<getAllPendingInvitationsResponseDTO> => {
    try {
        const response = await axios.get(Links.GET_ALL_PENDING_INVITATIONS, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            users: response.data.pendingInvitaions,
            errors: [],
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                users: [],
                errors: [error.response!.data.message],
            };
        }
        return {
            users: [],
            errors: ["An Error has occurred"],
        };
    }
};

export const getAllYourFriends = async (
    accessToken: string
): Promise<getAllYourFriendsResponseDTO> => {
    try {
        const response = await axios.get(Links.GET_ALL_YOUR_FRIENDS, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            users: response.data.friends,
            errors: [],
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                users: [],
                errors: [error.response!.data.message],
            };
        }
        return {
            users: [],
            errors: ["An Error has occurred"],
        };
    }
};

export const sendFriendRequest = async (
    id: string,
    accessToken: string
): Promise<boolean> => {
    try {
        const response = await axios.post(
            Links.FUNC_SEND_FRIEND_REQUEST(id),
            {},
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        return true;
    } catch (error: unknown) {
        return false;
    }
};

export const acceptFriendRequest = async (
    id: string,
    accessToken: string
): Promise<boolean> => {
    try {
        const response = await axios.put(
            Links.FUNC_ACCEPT_FRIEND_REQUEST(id),
            {},
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        return true;
    } catch (error: unknown) {
        return false;
    }
};
export const declineFriendRequest = async (
    id: string,
    accessToken: string
): Promise<boolean> => {
    try {
        const response = await axios.put(
            Links.FUNC_REFUSE_FRIEND_REQUEST(id),
            {},
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        return true;
    } catch (error: unknown) {
        return false;
    }
};
export const cancelFriendRequest = async (
    id: string,
    accessToken: string
): Promise<boolean> => {
    try {
        const response = await axios.delete(
            Links.FUNC_CANCEL_FRIEND_REQUEST(id),
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        return true;
    } catch (error: unknown) {
        return false;
    }
};
export const removeFriend = async (
    id: string,
    accessToken: string
): Promise<boolean> => {
    try {
        const response = await axios.delete(Links.FUNC_REMOVE_FRIEND(id), {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return true;
    } catch (error: unknown) {
        return false;
    }
};
