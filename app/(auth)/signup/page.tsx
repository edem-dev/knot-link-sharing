'use client'
import React, {useState} from 'react';
import Card from "@/components/atomic/Card";
import CardText from "@/components/atomic/CardText";
import Input from "@/components/atomic/Input";
import SectionTitle from "@/components/atomic/sectionTitle";
import Button from "@/components/atomic/Button";
import Link from "@/components/atomic/Links";

const page = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = useState('')

    return (
        <section className={"my-6  flex flex-col"}>
            <Card
                variant={'outlined'}
            >
                <SectionTitle
                    title={"Sign Up and Get Started"}
                    center={true}
                />
                {/*    Input fields go here*/}
                <Input
                    type={"email"}
                    label={"Email"}
                    placeholder={"your.email@example.com"}
                    value={email}
                    onChange={setEmail}
                    autoComplete={"off"}

                />
                <Input
                    type={"password"}
                    label={"Password"}
                    placeholder={"your.email@example.com"}
                    value={password}
                    onChange={setPassword}
                    autoComplete={"off"}
                />

                <Button
                    variant={"primary"}
                    size={"medium"}
                    wholeWidth={true}
                >
                    Login
                </Button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"/>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">OR</span>
                    </div>
                </div>

                <Button
                    variant={"outlined"}
                    size={"medium"}
                    wholeWidth={true}
                >
                    Continue with Google
                </Button>

                <Button
                    variant={"outlined"}
                    size={"medium"}
                    wholeWidth={true}
                >
                    Continue with Apple
                </Button>

                <div className="mt-4 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link href="/login">Login</Link>
                </div>

            </Card>
        </section>
    );
};

export default page;
