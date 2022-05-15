import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import clsx from "classnames";
import styles from "../styles/Home.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import handleIndexPageDOM from "../public/scripts/DOM_index";
import { signInCredentialsDTO, signUpCredentialsDTO } from "../DTO/index-dto";
import { signIn, singUp } from "../lib/index-lib";
import Alert from "../utils/Alert";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const PATH_TO_LOGO: string = `/images/logo.png`;
    const PATH_TO_IMAGE_1: string = `/images/image1.jpg`;
    const PATH_TO_IMAGE_2: string = `/images/image2.jpg`;
    const PATH_TO_IMAGE_3: string = `/images/image3.jpg`;
    const Logo_width: number = 40;
    const Logo_height: number = 40;
    const Carousel_width: number = 300;
    const Carousel_height: number = 200;

    const router = useRouter();

    const [signInCredentials, setSingInCredentials] =
        useState<signInCredentialsDTO>({ email: "", password: "" });
    const [signUpCredentials, setSingUpCredentials] =
        useState<signUpCredentialsDTO>({
            lastname: "",
            firstname: "",
            username: "",
            email: "",
            password: "",
        });

    const handleSignInCredentialsChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSingInCredentials({
            ...signInCredentials,
            [e.target.name]: e.target.value,
        });
    };
    const handleSignUpCredentialsChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSingUpCredentials({
            ...signUpCredentials,
            [e.target.name]: e.target.value,
        });
    };
    const handleFormSingInSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn(signInCredentials);
        if (result.errors.length === 0) {
            Alert(
                "success",
                "Logged In successfully",
                "Welcome to The-Linker, Enjoy your time"
            );
            localStorage.setItem("accessToken", result.accessToken);
            router.push("/chat");
        } else {
            Alert("error", "Failed To Log In", result.errors.join("\n"));
        }
    };
    const handleFormSingUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await singUp(signUpCredentials);
        if (result.errors.length === 0) {
            await Alert(
                "success",
                "Registred successfully",
                "Welcome to The-Linker, Enjoy your time"
            );
            localStorage.setItem("accessToken", result.accessToken);
            router.push("/chat");
        } else {
            await Alert(
                "error",
                "Failed To Create an account",
                result.errors.join("\n")
            );
        }
    };
    useEffect(() => {
        handleIndexPageDOM(styles);
        if (localStorage.getItem("accessToken")) router.push("/chat");
    }, []);
    return (
        <>
            <Head>
                <title>The-Linker | Sign In</title>
            </Head>
            <main className={styles.mainIndex}>
                <div className={styles.box}>
                    <div className={styles.innerBox}>
                        <div className={styles.formsWrap}>
                            <form
                                autoComplete="off"
                                className={clsx(
                                    styles.signInForm,
                                    styles.formIndex
                                )}
                                onSubmit={(e) => {
                                    handleFormSingInSubmit(e);
                                }}>
                                <div className={styles.logo}>
                                    <Image
                                        src={PATH_TO_LOGO}
                                        alt="Logo"
                                        width={Logo_width}
                                        height={Logo_height}
                                    />
                                    <h4>TheLinker</h4>
                                </div>
                                <div className={styles.heading}>
                                    <h2>Welcome Back</h2>
                                    <h6>Not registered yet?</h6>
                                    <h6 className={styles.toggle}>Sign up</h6>
                                </div>
                                <div className="actual-form">
                                    <div className={styles.inputWrap}>
                                        <input
                                            type="text"
                                            minLength={3}
                                            className={styles.inputField}
                                            autoComplete="off"
                                            name="email"
                                            value={signInCredentials.email}
                                            onChange={(e) => {
                                                handleSignInCredentialsChange(
                                                    e
                                                );
                                            }}
                                            required
                                        />
                                        <label className={styles.labelIndex}>
                                            Email
                                        </label>
                                    </div>

                                    <div className={styles.inputWrap}>
                                        <input
                                            type="password"
                                            minLength={3}
                                            className={styles.inputField}
                                            autoComplete="off"
                                            name="password"
                                            value={signInCredentials.password}
                                            onChange={(e) => {
                                                handleSignInCredentialsChange(
                                                    e
                                                );
                                            }}
                                            required
                                        />
                                        <label className={styles.labelIndex}>
                                            Password
                                        </label>
                                    </div>

                                    <input
                                        type="submit"
                                        value="Sign In"
                                        className={styles.signBtn}
                                    />

                                    <p className={styles.text}>
                                        Forgotten your password or you login
                                        details?
                                        <a href="#">Get help</a> signing in
                                    </p>
                                </div>
                            </form>
                            <form
                                autoComplete="off"
                                className={clsx(
                                    styles.signUpForm,
                                    styles.formIndex
                                )}
                                onSubmit={(e) => {
                                    handleFormSingUpSubmit(e);
                                }}>
                                <div className={styles.logo}>
                                    <Image
                                        src={PATH_TO_LOGO}
                                        alt="Logo"
                                        width={Logo_width}
                                        height={Logo_height}
                                    />
                                    <h4>TheLinker</h4>
                                </div>

                                <div className={styles.heading}>
                                    <h2>Get Started</h2>
                                    <h6>Already have an account?</h6>
                                    <h6 className={styles.toggle}>Sign in</h6>
                                </div>

                                <div className="actual-form">
                                    <div className={styles.inputWrap}>
                                        <input
                                            type="text"
                                            minLength={3}
                                            className={styles.inputField}
                                            autoComplete="off"
                                            name="lastname"
                                            value={signUpCredentials.lastname}
                                            onChange={(e) => {
                                                handleSignUpCredentialsChange(
                                                    e
                                                );
                                            }}
                                            required
                                        />
                                        <label className={styles.labelIndex}>
                                            Last name
                                        </label>
                                    </div>
                                    <div className={styles.inputWrap}>
                                        <input
                                            type="text"
                                            minLength={3}
                                            className={styles.inputField}
                                            autoComplete="off"
                                            name="firstname"
                                            value={signUpCredentials.firstname}
                                            onChange={(e) => {
                                                handleSignUpCredentialsChange(
                                                    e
                                                );
                                            }}
                                            required
                                        />
                                        <label className={styles.labelIndex}>
                                            First name
                                        </label>
                                    </div>
                                    <div className={styles.inputWrap}>
                                        <input
                                            type="text"
                                            minLength={4}
                                            className={styles.inputField}
                                            autoComplete="off"
                                            name="username"
                                            value={signUpCredentials.username}
                                            onChange={(e) => {
                                                handleSignUpCredentialsChange(
                                                    e
                                                );
                                            }}
                                            required
                                        />
                                        <label className={styles.labelIndex}>
                                            Username
                                        </label>
                                    </div>

                                    <div className={styles.inputWrap}>
                                        <input
                                            type="email"
                                            className={styles.inputField}
                                            autoComplete="off"
                                            name="email"
                                            value={signUpCredentials.email}
                                            onChange={(e) => {
                                                handleSignUpCredentialsChange(
                                                    e
                                                );
                                            }}
                                            required
                                        />
                                        <label className={styles.labelIndex}>
                                            Email
                                        </label>
                                    </div>

                                    <div className={styles.inputWrap}>
                                        <input
                                            type="password"
                                            minLength={4}
                                            className={styles.inputField}
                                            autoComplete="off"
                                            name="password"
                                            value={signUpCredentials.password}
                                            onChange={(e) => {
                                                handleSignUpCredentialsChange(
                                                    e
                                                );
                                            }}
                                            required
                                        />
                                        <label className={styles.labelIndex}>
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Sign Up"
                                        className={styles.signBtn}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className={styles.carousel}>
                            <div className={styles.imagesWrapper}>
                                <Image
                                    src={PATH_TO_IMAGE_1}
                                    alt="Logo"
                                    layout="responsive"
                                    className={clsx(
                                        styles.image,
                                        styles.img1,
                                        styles.show
                                    )}
                                    width={Carousel_width}
                                    height={Carousel_height}
                                />
                                <Image
                                    src={PATH_TO_IMAGE_2}
                                    alt="Logo"
                                    layout="responsive"
                                    className={clsx(styles.image, styles.img2)}
                                    width={Carousel_width}
                                    height={Carousel_height}
                                />
                                <Image
                                    src={PATH_TO_IMAGE_3}
                                    alt="Logo"
                                    layout="responsive"
                                    className={clsx(styles.image, styles.img3)}
                                    width={Carousel_width}
                                    height={Carousel_height}
                                />
                            </div>

                            <div className={styles.textSlider}>
                                <div className={styles.textWrap}>
                                    <div className={styles.textGroup}>
                                        <h2>Connect with your friends</h2>
                                        <h2>Stay in touch</h2>
                                        <h2>Keep safe and secure</h2>
                                    </div>
                                </div>

                                <div className={styles.bullets}>
                                    <span
                                        className={styles.active}
                                        data-value="1"></span>
                                    <span data-value="2"></span>
                                    <span data-value="3"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
