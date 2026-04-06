'use client'
import React, {useState} from 'react';
import Link from "next/link";
import Button from "@/components/atomic/Button";
import {useRouter} from "next/navigation";
import Divider from "@/components/atomic/Divider";
import Modal from "@/components/atomic/Modal";

const page = () => {

    const [open, setOpen] = useState(false)
    const router = useRouter()

    return (
        <div>



                <Button variant={"primary"}>Get Started</Button>
                <Button onClick={()=>router.push("/testComponents")} variant={"outline"}>Test components</Button>
                <Divider label={"or use email"}/>
                <Divider/>
            <div className={'w-10 h-10 px-4 font-bold text-xl bg-brand-900  font-body'}>Hello</div>

            <Button variant={"primary"} onClick={() => setOpen(true)}>Open</Button>


            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Delete this link?"
                description="This action cannot be undone."
                footer={
                    <>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="danger" onClick={()=> alert("heiiiii")}>Delete</Button>
                    </>
                }
            >
                <p className="text-sm text-slate-600">
                    "My Portfolio" will be permanently removed from your page.
                </p>
            </Modal>

        </div>
    );
};

export default page;
