import Image from "next/image";
import styles from "../styles/Profile.module.css";
import clsx from "classnames";
import { getUser, validateUpdateForm } from "../lib/profile-lib";
import { updateProfileDTO, User } from "../DTO/profile-dto";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";

const Profile = () => {
    const AVATAR_WIDTH: number = 50;
    const AVATAR_HEIGHT: number = 50;

    const [currentUser, setCurrentUser] = useState<User>({
        id: "",
        lastname: "user",
        firstname: "sqdsq",
        username: "",
        email: "",
        password: "",
        avatar: "",
    });
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
            console.log("user is ", user);
            if (user) {
                setCurrentUser(user);
            }
        });
    }, []);

    const show_updateForm = async () => {
        const result = await validateUpdateForm(currentUser);
        if (result && result.isConfirmed) {
            const updateProfileDto: updateProfileDTO = result.value!;
        }
    };
    return (
        <>
            <main className={styles.mainProfile}>
                <div className={styles.box}>
                    <div className={styles.innerBox}>
                        <div className="container d-flex flex-column align-items-center bg-white mt-n5">
                            <h4 className=" border-bottom">Your Profile</h4>
                            <div className="d-flex align-items-start py-3 border-bottom">
                                <Image
                                    src="/images/background1.jpg"
                                    className={styles.img}
                                    alt="your avatar"
                                    width={AVATAR_WIDTH}
                                    height={AVATAR_HEIGHT}
                                />
                                <div className="ps-sm-4 ps-2" id="imgSection">
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
                                            defaultValue={currentUser.lastname}
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
                                            defaultValue={currentUser.firstname}
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
                                            defaultValue={currentUser.username}
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
                                            defaultValue={currentUser.email}
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
                                        )}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default Profile;
