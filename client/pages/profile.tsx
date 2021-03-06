import Image from "next/image";
import styles from "../styles/Profile.module.css";
import clsx from "classnames";
import { getUser, updateProfile, validateUpdateForm } from "../lib/profile-lib";
import {
    updateProfileDTO,
    updateProfileResponseDTO,
    User,
} from "../DTO/profile-dto";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Alert from "../utils/Alert";
import Head from "next/head";
import Link from "next/link";

const Profile = () => {
    const AVATAR_WIDTH: number = 50;
    const AVATAR_HEIGHT: number = 50;
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState<User>({
        id: "",
        lastname: "",
        firstname: "",
        username: "",
        email: "",
        password: "",
        avatar: "",
        connected: false,
    });
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const callAPI = async () => {
            const accessToken: string | null =
                localStorage.getItem("accessToken");
            if (accessToken) {
                const user: User | null = await getUser(accessToken);
                return user;
            } else {
                return null;
            }
        };
        callAPI().then((user) => {
            if (user) {
                setCurrentUser(user);
                setLoading(false);
            } else {
                router.push("/");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const show_updateForm = async () => {
        const result = await validateUpdateForm(currentUser);
        const accessToken: string = localStorage.getItem("accessToken")!;
        if (result && result.isConfirmed) {
            const updateProfileDto: updateProfileDTO = result.value!;
            const { user, errors }: updateProfileResponseDTO =
                await updateProfile(updateProfileDto, accessToken);
            if (errors.length > 0) {
                await Alert(
                    "error",
                    "Failed to update profile",
                    errors.join("\n")
                );
            } else {
                await Alert("success", "Profile updated successfully", "");
                setCurrentUser(user!);
            }
        }
    };
    return (
        !loading && (
            <>
                <Head>
                    <title>The-Linker | Profile</title>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    />
                </Head>
                <main className={styles.mainProfile}>
                    <div className={styles.box}>
                        <div className={styles.innerBox}>
                            <div className="container d-flex flex-column align-items-center bg-white mt-n5">
                                <h4 className=" border-bottom">Your Profile</h4>
                                <div className="d-flex align-items-start py-3 border-bottom">
                                    <Image
                                        src={currentUser.avatar}
                                        className={styles.img}
                                        alt="your avatar"
                                        width={AVATAR_WIDTH}
                                        height={AVATAR_HEIGHT}
                                    />
                                    <div
                                        className="ps-sm-4 ps-2"
                                        id="imgSection">
                                        <b>{`${currentUser.lastname.toUpperCase()} ${currentUser.firstname.toLowerCase()}`}</b>
                                        <p
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="click on to copy ID"
                                            style={{ cursor: "pointer" }}>
                                            {currentUser.id}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="row py-2">
                                        <div className="col-md-6">
                                            <label
                                                htmlFor="lastname"
                                                className="form-label">
                                                last name
                                            </label>
                                            <input
                                                type="text"
                                                className="bg-light form-control"
                                                value={currentUser.lastname}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label
                                                htmlFor="firstname"
                                                className="form-label">
                                                first name
                                            </label>
                                            <input
                                                type="text"
                                                className="bg-light form-control"
                                                value={currentUser.firstname}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row py-2 justify-content-center">
                                        <div className="col-md-6">
                                            <label htmlFor="username">
                                                username
                                            </label>
                                            <input
                                                type="text"
                                                className="bg-light form-control"
                                                value={currentUser.username}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="bg-light form-control"
                                                value={currentUser.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="py-3 pb-4 border-bottom">
                                        <button
                                            onClick={show_updateForm}
                                            className="btn btn-primary me-3">
                                            Update
                                        </button>
                                        <button
                                            className={clsx(
                                                styles.danger,
                                                "btn danger"
                                            )}
                                            onClick={() => {
                                                localStorage.removeItem(
                                                    "accessToken"
                                                );
                                                router.push("/");
                                            }}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.navigation_buttons}>
                            <Link href="/chat">
                                <span className={styles.navigation_button}>
                                    <i className="fa-solid fa-arrow-left" />{" "}
                                    Back to chat
                                </span>
                            </Link>
                            <Link href="/home">
                                <span className={styles.navigation_button}>
                                    Go to Home Page{" "}
                                    <i className="fa-solid fa-arrow-right" />{" "}
                                </span>
                            </Link>
                        </div>
                    </div>
                </main>
            </>
        )
    );
};
export default Profile;
