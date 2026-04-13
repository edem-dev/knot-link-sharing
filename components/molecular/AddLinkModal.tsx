'use client';

import React, {useEffect,useState} from 'react';
import { Link, Globe, ExternalLink, CheckCircle2, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import Modal from "@/components/atomic/Modal";
import Input from "@/components/atomic/Input";
import Button from "@/components/atomic/Button"

// Link row data
export interface LinkRowData{
    id:string;
    title:string;
    url:string;
}

// Main conponent interface
export interface AddLinkModalProps {
    isOpen:boolean;
    onClose:()=>void;
    onAdd:(link: Omit<LinkRowData, "id">) => void;
    loading?:boolean;
}


const AddLinkModal:React.FC<AddLinkModalProps> = (
    {
        isOpen,
        onClose,
        onAdd,
        loading = false,
    }
) => {
    // All form state
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [titleError, setTitleError] = useState("")
    const [urlError, setUrlError] = useState("")

    // The use effect hook: If the modal is open "isOpen = {"true"}",
    // set all form fields to be open

    useEffect(() => {
        if (isOpen){
            setTitle("");
            setUrl("");
            setTitleError("");
            setUrlError("");
        }
    }, [isOpen]);

    // <Form validation---------------------------------->
    const validate = ():boolean =>{
        let valid = true
    //     "let" is use to asign this variable beacuse it will be modified later

    //     Validate title-------------------------------------->
        if (!title.trim()){
            setTitleError("Please enter a title for this link")
            valid = false
        }else{
            setTitleError(""); //clear the previous error
        }
    //     Valiate URl ------------------------------------------>
        if (!url.trim()){
            setUrlError("Please enter a URL");
            valid = false;
        }else if(!/^https?:\/\/.+/.test(url.trim())){
            setUrlError("URL must start with https:// or http://");
            valid = false;
        }else{
            setUrlError("");
        }

        return valid;
    }

    // Form Submission handler function
    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault(); // Prevents form reload

        if(!validate()) return; //checks whether all fields have been validated

        onAdd({
            title:title.trim(),
            url:url.trim()
        });
    }

    // Live preview condition: Show a live preview if ->title is not empty,url is not empty
    //there is no title error and there is not url error
    const showPreview = !!title.trim() && !!url.trim() && !titleError && !urlError;




    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Add new link"}
            description={"This link will appear on your knotted page"}
            size={"md"}
            footer={
                <>
                    <Button
                        variant="outline"
                        size="md"
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                // Disable Cancel while loading too — prevents closing mid-save.
                    >
                        Cancel
                    </Button>

                    <Button
                        variant={"primary"}
                        size={"md"}
                        type={"submit"}
                        form={"add-link-form"}
                        loading={loading}
                        leftIcon={<Plus className={"w-4 h-4"}/>}
                    >
                        Add Link
                    </Button>
                </>
            }
        >

            <form
                id={"add-link-form"}
                onSubmit={handleSubmit}
                noValidate
                className={"flex flex-col font-display gap-4"}
            >
            {/*    Title field ---------------------------------------*/}
                <div className={"flex flex-col gap-1.5"}>
                    <label
                        htmlFor={"modal-link-title"}
                        className={`text-xs font-display font-semibold 
                        uppercase tracking-widest text-slate-500 dark:text-slate-400`}
                    >
                        Link Title
                    </label>
                    <Input
                        id={"modal-link-title"}
                        type={"text"}
                        value={title}
                        onChange={(e)=>{
                            setTitle(e.target.value)
                        //     Clear the error as soon as the [userPublic] starts typing.UX trick
                            if (titleError) setTitleError("")
                        }}
                        placeholder={"My Youtube channel"}
                        leadingIcon={<Link className={"w-4 h-4"}/>}
                        inputState={
                            titleError ? "error"
                                :title ? "success"
                                :"default"
                        }
                        disabled={loading}
                        autoFocus
                        autoComplete={"off"}
                    />

                {/*    Title Error handler -------------------------------*/}
                    {(titleError || !title) && (
                        <p
                            className={`text-xs font-body 
                            ${titleError ? "text-red-500" : "text-slate-400"}`}
                            role={titleError ? "alert" : undefined}
                        >
                            {titleError || "e.g. My Youtube channel , Portfolio website"}
                        </p>
                    )}
                </div>

            {/*    URL ---------------------------------------------------------------*/}
                <div className={"flex flex-col gap-1.5"}>
                    <label
                        htmlFor={"modal-link-url"}
                        className={`text-xs font-display font-semibold uppercase tracking-widest
                         text-slate-500 dark:text-slate-400`}
                    >
                        URL
                    </label>

                    <Input
                        id={"modal-link-url"}
                        type={"url"}
                        value={url}
                        onChange={(e)=>{
                            setUrl(e.target.value)
                            if (urlError) setUrlError("")
                        }}
                        placeholder={"https://example.com"}
                        leadingIcon={<Globe className={"w-4 h-4"}/>}
                        inputState={
                        urlError ? "error"
                            :url ? "success"
                            :"default"
                        }
                        disabled={loading}
                        autoComplete={"off"}
                    />

                {/*    Error helper */}
                    {(urlError || !url) && (
                        <p
                            className={`text-xs font-body ${urlError ? "text-red-500" : "text-slate-400"}`}
                            role={urlError ? "alert" : undefined}
                        >
                            {urlError || "Paste the full URL including https://"}
                        </p>
                    )}
                </div>

            {/*    Live preview strip : Shows a live preview of the link*/}
                {showPreview && (
                    <div
                        className={clsx(
                            "flex items-center mt-2 gap-3 px-4 py-3",
                            "bg-brand-200 dark:bg-brand-900/20",
                            "border border-brand-50 dark:border-brand-800",
                            "rounded-2xl"
                        )}
                        aria-label={"Link preview"}
                        aria-live={"polite"}
                    >
                    {/*    Left icon wrapper*/}
                        <div
                            className={clsx(
                                "w-8 h-8 rounded-xl",
                                "bg-brand-100 dark:bg-brand-900/40",
                                "flex items-center justify-center shrink-0"
                            )}
                        >
                            <ExternalLink
                                className={"w-4 h-4 text-brand-600 dark:text-brand-400"}
                                aria-hidden={"true"}
                            />
                        </div>
                    {/*    Preview text - titl and URl*/}
                        <div className={"min-w-0 flex-1"}>
                            <p className="text-sm font-display font-semibold text-slate-800 dark:text-white truncate">
                                {title}
                            </p>
                            <p className="text-xs font-body text-brand-600 dark:text-brand-400 truncate">
                                {url}
                            </p>
                        </div>
                    {/*    Sucess tick*/}
                        <CheckCircle2
                            className={"w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0"}
                            aria-hidden={"true"}
                        />
                    </div>
                )}
            </form>
        </Modal>
    );
};

export default AddLinkModal;
