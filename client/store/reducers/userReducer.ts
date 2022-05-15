import { Reducer, ReducerWithoutAction } from "react";
import { User, USER_ACTIONS } from "../types";

type UserActionType = { type: keyof USER_ACTIONS; payload: { user: User } };

export const userReducer: Reducer<User, UserActionType> = (
    state: User,
    action: UserActionType
) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTIONS.UPDATE_USER:
            return payload.user;
        case USER_ACTIONS.USER_LOADED:
            return payload.user;
        case USER_ACTIONS.REGISTER_SUCCESS:
            return payload.user;
        case USER_ACTIONS.LOGIN_SUCCESS:
            return payload.user;
        case USER_ACTIONS.AUTH_ERROR:
        case USER_ACTIONS.LOGIN_FAIL:
        case USER_ACTIONS.LOGOUT:
            return payload.user;
        case USER_ACTIONS.REGISTER_FAIL:
        default:
            return payload.user;
    }
};
