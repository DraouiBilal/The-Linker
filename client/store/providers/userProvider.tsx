import { createContext, ReactNode, useReducer } from "react";
import { User } from "../types";
import { userReducer } from "../reducers/userReducer";

const UserProvider = ({ children }: { children: ReactNode }) => {
    const userInitialState = new User();
    const UserContext = createContext<User>(userInitialState);
    const [state, dispatch] = useReducer(userReducer, userInitialState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;
