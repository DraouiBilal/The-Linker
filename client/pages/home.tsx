import { useRouter } from "next/router";
import { createRef, RefObject, useEffect, useRef, useState } from "react";
import { FriendProps } from "../components/Home/NewFriends/Friends";
import NewFriends from "../components/Home/NewFriends/NewFriends";
import { PendingInvitationProps } from "../components/Home/PendingInvitations/PendingInvitation";
import PendingInvitations from "../components/Home/PendingInvitations/PendingInvitations";
import { PendingRequestProps } from "../components/Home/PendingRequests/PendingRequest";
import PendingRequests from "../components/Home/PendingRequests/PendingRequests";
import { YourFriendProps } from "../components/Home/YourFriends/YourFriend";
import YourFriends from "../components/Home/YourFriends/YourFriends";
import {
    getAllPendingInvitations,
    getAllPendingRequests,
    getAllUsers,
    getAllYourFriends,
} from "../lib/home-lib";
import Alert from "../utils/Alert";

const Home = () => {

    const router = useRouter()

    const [tab, setTab] = useState<"NF" | "PI" | "PR" | "YF">("NF");
    const [newFriends, setNewFriends] = useState<FriendProps[]>([]);
    const [pendingInvitations, setPendingInvitations] = useState<
        PendingInvitationProps[]
    >([]);
    const [pendingRequests, setPendingRequests] = useState<
        PendingRequestProps[]
    >([]);
    const [yourFriends, setYourFriends] = useState<YourFriendProps[]>([]);

    const NF = createRef<HTMLParagraphElement>();
    const PI = createRef<HTMLParagraphElement>();
    const PR = createRef<HTMLParagraphElement>();
    const YF = createRef<HTMLParagraphElement>();

    const toggleClassFor = (
        ref1: RefObject<HTMLParagraphElement>,
        ref2: RefObject<HTMLParagraphElement>,
        ref3: RefObject<HTMLParagraphElement>,
        ref4: RefObject<HTMLParagraphElement>,
        classes: string[]
    ) => {
        classes.map((clazs) => {
            if (!ref1.current?.classList.contains(clazs)) {
                ref1.current?.classList.add(clazs);
            }
            if (ref2.current?.classList.contains(clazs)) {
                ref2.current?.classList.remove(clazs);
            }
            if (ref3.current?.classList.contains(clazs)) {
                ref3.current?.classList.remove(clazs);
            }
            if (ref4.current?.classList.contains(clazs)) {
                ref4.current?.classList.remove(clazs);
            }
        });
    };



    const handleNavClick = (currentTab: "NF" | "PI" | "PR" | "YF") => {
        switch (currentTab) {
            case "NF":
                setTab("NF");
                toggleClassFor(NF, PI, PR, YF, ["active"]);
                break;
            case "PI":
                setTab("PI");
                toggleClassFor(PI, PR, YF, NF, ["active"]);

                break;
            case "PR":
                setTab("PR");
                toggleClassFor(PR, YF, NF, PI, ["active"]);

                break;
            case "YF":
                setTab("YF");
                toggleClassFor(YF, NF, PI, PR, ["active"]);

                break;
        }
    };
    const getNewFriends = async (): Promise<boolean> => {
        const accessToken: string = localStorage.getItem("accessToken")!;
        const { users, errors } = await getAllUsers(accessToken);
        if (errors.length === 0) {
            setNewFriends(
                users.map((user) => {
                    return {
                        id: user.id,
                        username: user.username,
                        avatar: user.avatar,
                    };
                })
            );
            return true;
        }
        await Alert(
            "error",
            "Failed to get new users",
            "You will be redirected to your profile"
        );
        return false;
    };
    const getPendingRequests = async (): Promise<boolean> => {
        const accessToken: string = localStorage.getItem("accessToken")!;
        const { users, errors } = await getAllPendingRequests(accessToken);
        if (errors.length === 0) {
            setPendingRequests(
                users.map((user) => {
                    return {
                        id: user.id,
                        username: user.username,
                        avatar: user.avatar,
                    };
                })
            );
            return true;
        }
        await Alert(
            "error",
            "Failed to get pending requests",
            "You will be redirected to your profile"
        );
        return false;
    };
    const getPendingInvitations = async (): Promise<boolean> => {
        const accessToken: string = localStorage.getItem("accessToken")!;
        const { users, errors } = await getAllPendingInvitations(accessToken);
        if (errors.length === 0) {
            setPendingInvitations(
                users.map((user) => {
                    return {
                        id: user.id,
                        username: user.username,
                        avatar: user.avatar,
                    };
                })
            );
            return true;
        }
        await Alert(
            "error",
            "Failed to get pending invitations",
            "You will be redirected to your profile"
        );
        return false;
    };
    const getYourFriends = async (): Promise<boolean> => {
        const accessToken: string = localStorage.getItem("accessToken")!;
        const { users, errors } = await getAllYourFriends(accessToken);
        if (errors.length === 0) {
            setYourFriends(
                users.map((user) => {
                    return {
                        id: user.id,
                        username: user.username,
                        avatar: user.avatar,
                    };
                })
            );
            return true;
        }
        await Alert(
            "error",
            "Failed to get the list of your friends",
            "You will be redirected to your profile"
        );
        return false;
    };
    useEffect(() => {
        if(!localStorage.getItem("accessToken"))
            router.push('/')
        switch (tab) {
            case "NF":
                getNewFriends().then((status) => {
                    if (status === false) {
                        router.push("/profile");
                    }
                });
                break;
            case "PI":
                getPendingInvitations().then((status) => {
                    if (status === false) {
                        router.push("/profile");
                    }
                });
                break;
            case "PR":
                getPendingRequests().then((status) => {
                    if (status === false) {
                        router.push("/profile");
                    }
                });
                break;
            case "YF":
                getYourFriends().then((status) => {
                    if (status === false) {
                        router.push("/profile");
                    }
                });
                break;
            default:
                router.push("/404");
        }
    }, [router, tab]);
    return (
        <>
            <div className="container bg-transparent mt-3 rounded ">
                <div className="">
                    <ul className="nav nav-tabs nav-justified justify-content-between mb-4">
                        <li className="nav-item me-5 ">
                            <p
                                className="nav-link active"
                                role={"button"}
                                ref={NF}
                                onClick={() => {
                                    handleNavClick("NF");
                                }}>
                                New friends
                            </p>
                        </li>
                        <li className="nav-item me-5 ms-5" role={"button"}>
                            <p
                                className="nav-link"
                                role={"button"}
                                ref={PI}
                                onClick={() => {
                                    handleNavClick("PI");
                                }}>
                                Pending Invitations
                            </p>
                        </li>
                        <li className="nav-item me-5 ms-5" role={"button"}>
                            <p
                                className="nav-link"
                                role={"button"}
                                ref={PR}
                                onClick={() => {
                                    handleNavClick("PR");
                                }}>
                                Pending Requests
                            </p>
                        </li>
                        <li className="nav-item  ms-5" role={"button"}>
                            <p
                                className="nav-link"
                                role={"button"}
                                ref={YF}
                                onClick={() => {
                                    handleNavClick("YF");
                                }}>
                                Your friends
                            </p>
                        </li>
                    </ul>
                </div>
                <div>
                    {tab == "NF" && (
                        <>
                            <div className="container mb-3">
                                <NewFriends newFriends={newFriends} />
                            </div>
                        </>
                    )}
                    {tab === "PI" && (
                        <>
                            <div className="container mb-3">
                                <PendingInvitations
                                    pendingInvitations={pendingInvitations}
                                />
                            </div>
                        </>
                    )}
                    {tab === "PR" && (
                        <>
                            <div className="container mb-3">
                                <PendingRequests
                                    pendingRequests={pendingRequests}
                                />
                            </div>
                        </>
                    )}
                    {tab === "YF" && (
                        <>
                            <div className="container mb-3">
                                <YourFriends yourFriends={yourFriends} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default Home;
