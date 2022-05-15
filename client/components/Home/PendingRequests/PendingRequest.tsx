import Image from "next/image";
import { cancelFriendRequest } from "../../../lib/home-lib";
import Alert from "../../../utils/Alert";

export type PendingRequestProps = {
    username: string;
    id: string;
    avatar: string;
};

const PendingRequest = ({ id, username, avatar }: PendingRequestProps) => {
    const AVATAR_WIDTH = 310;
    const AVATAR_HEIGHT = 190;
    const handleCancelRequest = async () => {
        const accessToken: string = localStorage.getItem("accessToken")!;
        const OK = await cancelFriendRequest(id, accessToken);
        if (!OK) {
            await Alert(
                "error",
                "could not cancel friend request",
                "this may happen due to server error, try later"
            );
        } else {
            await Alert("success", "you have canceled that friend request", "");
            (
                document.getElementsByClassName(
                    "nav-link"
                )[0]! as HTMLParagraphElement
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
                        onClick={() => {
                            handleCancelRequest();
                        }}
                        className="btn btn-outline-danger rounded rounded-pill align-self-center w-50">
                        <div
                            className="d-flex justify-content-center align-items-center "
                            role="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-x-circle"
                                viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    fillRule="evenodd"
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                            <p className="ms-1 mb-0">cancel</p>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};
export default PendingRequest;
