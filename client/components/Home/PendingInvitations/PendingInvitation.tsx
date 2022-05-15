import Image from "next/image";
import {
    acceptFriendRequest,
    declineFriendRequest,
} from "../../../lib/home-lib";
import Alert from "../../../utils/Alert";

export type PendingInvitationProps = {
    username: string;
    id: string;
    avatar: string;
};

const PendingInvitation = ({
    id,
    username,
    avatar,
}: PendingInvitationProps) => {
    const AVATAR_WIDTH = 310;
    const AVATAR_HEIGHT = 190;
    const handleAcceptFriendRequest = async () => {
        const accessToken: string = localStorage.getItem("accessToken")!;
        const OK = await acceptFriendRequest(id, accessToken);
        if (!OK) {
            await Alert(
                "error",
                "could not accept friend request",
                "this may happen due to server error, try later"
            );
        } else {
            await Alert("success", "friend Added successfully", "");
            (
                document.getElementsByClassName(
                    "nav-link"
                )[0]! as HTMLParagraphElement
            ).click();
        }
    };
    const handleDeclineFriendRequest = async () => {
        const accessToken: string = localStorage.getItem("accessToken")!;
        const OK = await declineFriendRequest(id, accessToken);
        if (!OK) {
            await Alert(
                "error",
                "could not decline friend request",
                "this may happen due to server error, try later"
            );
        } else {
            await Alert("success", "demand refused", "");
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
                    src={`/images/image${
                        Math.floor(Math.random() * 3) + 1
                    }.jpg`}
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
                    <div className="d-flex justify-content-around align-items-baseline">
                        <button
                            type="button"
                            className="me-4 btn btn-outline-primary rounded rounded-pill align-self-center w-50"
                            onClick={() => {
                                handleAcceptFriendRequest();
                            }}>
                            <div
                                className="d-flex justify-content-center align-items-baseline "
                                role="button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-person-check-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        fillRule="evenodd"
                                        d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                    />
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                                <p className="ms-1 mb-0">accept</p>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleDeclineFriendRequest();
                            }}
                            className="btn btn-outline-danger rounded rounded-pill align-self-center w-50">
                            <div
                                className="d-flex justify-content-center align-items-baseline "
                                role="button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-person-x-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        fillRule="evenodd"
                                        d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                                    />
                                </svg>
                                <p className="ms-1 mb-0">decline</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PendingInvitation;
