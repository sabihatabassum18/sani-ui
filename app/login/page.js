"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

// create a login page using daisy ui
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";

import heroImage from "../../public/heroimage.jpg"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data: session } = getSession();

    if (session) {
        // Redirect to dashboard if user is already logged in
        window.location.href = "/dashboard";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (!result.error) {
            // Redirect to dashboard
            window.location.href = "/dashboard";
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    return (
        <div className="flex flex-row gap-6 items-center justify-center h-screen">
            <div className="flex-1 flex justify-center items-center w-full h-full hidden sm:flex">
                {/* Image */}
                <Image src={heroImage} alt="Login Image" className="w-full h-full object-cover" />

            </div>

            <div className="flex-1 flex justify-center items-center">
                <form onSubmit={handleSubmit} >
                    <div className="w-80 flex flex-col gap-6">
                        <h1 className="text-4xl font-bold py-6">Login</h1>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Email" name="email" onChange={handleChange} />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" placeholder="Password" name="password" onChange={handleChange} />
                        </label>
                        <button className="btn bg-violet-700 text-white" type="submit" >Login</button>
                        <p>Don't have any account? <Link href="/signup" className="text-violet-700">Sign Up</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    );
}