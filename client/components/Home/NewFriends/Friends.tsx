import Image from "next/image";
import Router from "next/router";
import { sendFriendRequest } from "../../../lib/home-lib";
import Alert from "../../../utils/Alert";

export type FriendProps = {
    username: string;
    id: string;
    avatar: string;
};

const Friend = ({ avatar, username, id }: FriendProps) => {
    const AVATAR_WIDTH = 310;
    const AVATAR_HEIGHT = 190;
    const handleSendFriendRequest = async () => {
        const accessToken: string = localStorage.getItem("accessToken")!;
        const OK = await sendFriendRequest(id, accessToken);
        if (!OK) {
            await Alert("error", "Failed to send friend request", "");
        } else {
            await Alert("success", "request sent successfully", "");
            (
                document.getElementsByClassName(
                    "nav-link"
                )[2]! as HTMLParagraphElement
            ).click();
        }
    };
    return (
        <>
            <div className="card h-100">
                <Image
                    src={avatar}
                    className="card-img-top rounded-bottom rounded-3"
                    alt="..."
                    width={AVATAR_WIDTH}
                    height={AVATAR_HEIGHT}
                    style={{
                        objectFit: "contain",
                    }}
                />
                <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title">{username}</h5>
                    <p className="card-text" style={{ fontSize: "11px" }}>
                        {id}
                    </p>
                    <button
                        type="button"
                        className="btn btn-outline-primary rounded rounded-pill align-self-center w-50"
                        onClick={() => {
                            handleSendFriendRequest();
                        }}>
                        <div className="d-flex justify-content-center align-items-baseline ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-person-plus-fill"
                                viewBox="0 0 16 16">
                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                                />
                            </svg>
                            <p className="ms-1 mb-0">add</p>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};
export default Friend;
