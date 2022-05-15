import API from "./api";

const Links = {
    LOGIN_LINK: `${API.BASE_API_URL}/auth/login`,
    REGISTER_LINK: `${API.BASE_API_URL}/auth/signup`,
    GET_PROFILE_LINK: `${API.BASE_API_URL}/profile/`,
    UPDATE_PROFILE_LINK: `${API.BASE_API_URL}/profile/`,
    GET_ALL_USERS_LINK: `${API.BASE_API_URL}/users/unknown-users`,
    GET_ALL_PENDING_REQUESTS: `${API.BASE_API_URL}/users/pending-requests`,
    GET_ALL_PENDING_INVITATIONS: `${API.BASE_API_URL}/users/invitations`,
    GET_ALL_YOUR_FRIENDS: `${API.BASE_API_URL}/users/friends`,
    FUNC_SEND_FRIEND_REQUEST: (id: string) => {
        return `${API.BASE_API_URL}/users/request/${id}`;
    },
    FUNC_ACCEPT_FRIEND_REQUEST: (id: string) => {
        return `${API.BASE_API_URL}/users/request/${id}/accept`;
    },
    FUNC_REFUSE_FRIEND_REQUEST: (id: string) => {
        return `${API.BASE_API_URL}/users/request/${id}/refuse`;
    },
    FUNC_CANCEL_FRIEND_REQUEST: (id: string) => {
        return `${API.BASE_API_URL}/users/request/${id}`;
    },
    FUNC_REMOVE_FRIEND: (id: string) => {
        return `${API.BASE_API_URL}/users/friend/${id}`;
    },
};
export default Links;
