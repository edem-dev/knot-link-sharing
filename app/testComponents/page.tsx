'use client'
import React, {useState} from 'react';
import Button from "@/components/atomic/Button";
import Badge from "@/components/atomic/Badge";
import Input from "@/components/atomic/Input";
import {
    Mail,
    Lock,
    CheckCircle2,
    Plus,
    AtSign,
    ShareIcon,
    Palette,
    Globe,
    Youtube,
    LayoutDashboard
} from "lucide-react";
import Textarea from "@/components/atomic/Textarea";
import Avatar from "@/components/atomic/Avatar";
import fresh from "@/public/Image/frresh.jpg"
import Divider from "@/components/atomic/Divider";
import StatusIndicator from "@/components/atomic/StatusIndicator";
import Modal from "@/components/atomic/Modal";
import AddLinkModal, {LinkRowData} from "@/components/molecular/AddLinkModal";
import FormField from "@/components/molecular/Formfield";
import EditableLinkRow from "@/components/molecular/EditableLinkRow";
import NavLink from "@/components/molecular/NavLink";
import FeatureCard from "@/components/molecular/FeatureCard";
import PublicLinkItem from "@/components/molecular/PublicLinkItem";
import SidebarNavItem from "@/components/molecular/SidebarNavItem";

const page = () => {

    const [bio, setBio] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [openAddLink, setOpenAddLink] = useState(false)
    const [links, setLinks] = useState<LinkRowData[]>([])
    const [editableLinks, setEditableLinks] = useState<LinkRowData[]>([
             { id: "1", title: "Portfolio", url: "https://alexrivers.design" },
             { id: "2", title: "Youtube", url: "https://youtube.com/demi" },
       ]);

    const handleChange = (id: string, field: "title" | "url", value: string) => {
        setEditableLinks(prev =>
               prev.map(editableLinks => editableLinks.id === id ? { ...editableLinks, [field]: value } : editableLinks)
             );
    };

    const handleDelete = (id: string) => {
        setEditableLinks(prev => prev.filter(editableLinks => editableLinks.id !== id));
       };


    return (
        <div className={"p-6"}>
            <div className={"flex gap-2 m-4"}>
                <Button variant={"secondary"}> Get started</Button>
                <Button variant={"dark"}> Get started</Button>
                <Button loading={true} variant={"danger"}> Get started</Button>
            </div>
            <div className={'flex gap-2 m-4'}>
                <Badge variant={"success"}>Success</Badge>
                <Badge variant={"info"}>Done</Badge>
                <Badge variant={"warning"}>Warning</Badge>
                <Badge variant={"danger"}>Danger</Badge>
                <Badge size={'sm'} variant={"purple"}>Danger</Badge>
            </div>

        {/*    Inputs*/}
            <div className={"flex flex-col gap-4"}>
                <Input
                    id="email"
                     type="email"
                     placeholder="name@company.com"
                     leadingIcon={<Mail className="w-4 h-4" />}
                    // className={"border border-slate-200 rounded-md"}
                   />
                <Input
                    id="password"
                    type={"password"}
                    placeholder="••••••••"
                    leadingIcon={<Lock className="w-4 h-4" />}
                />
                <Input
                    id="username"
                     prefix="knotted.com/"
                     placeholder="yourname"
                     inputState="success"
                     trailingIcon={<CheckCircle2 className="w-4 h-4 text-brand-600" />}
                   />
            </div>
        {/*    Test Area*/}
            <div className={"flex flex-col gap-4 my-4"}>
                <Textarea
                    id="bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    maxLength={160}
                    currentLength={bio.length}
                    rows={4}
                    placeholder="Tell the world about yourself..."
                />
            </div>
        {/*    Avatar*/}
            <div className={"flex items-center flex-row gap-4"}>
                <Avatar onEdit={()=> alert("Edit Avatar")} editable={true} name={"Mike Kumah"} size={"md"}/>
                <Avatar onEdit={()=> alert("Edit Avatar")} editable={false} name={"Mike Kumah"} size={"lg"}/>
                <Avatar onEdit={()=> alert("Edit Avatar")} editable={true} name={"Step  hen Appiah"} size={"xl"}/>
            </div>

        {/*    Divider*/}
            <div className={"w-full flex flex-col gap-4"}>
            <Divider label={"or use email"}/>
            <Divider/>
            </div>

        {/*    Status indicator*/}
            <div className={"my-4 flex flex-col gap-4"}>
                <StatusIndicator variant="success" message="Username is available!" />
                <StatusIndicator variant="error"   message="That username is taken." />
                <StatusIndicator variant="info"    message="Usernames must be 3+ characters." />
            </div>

        {/*Modal---------------------------*/}
            <div>
                <Button variant={"primary"} onClick={() => setOpen(true)}>Open</Button>

                <Modal
                     isOpen={open}
                     onClose={() => setOpen(false)}
                     title="Confirm deletion"
                     description="This action cannot be undone."
                     footer={
                       <>
                           <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                           <Button variant="danger"  onClick={()=> alert("deleted")}>Delete</Button>
                   </>
                }
                >
                    <p className="text-sm text-slate-600">Delete this link?</p>
            </Modal>
            </div>

        {/*    Molecular Components*/}
            <section>
            <h2 className={"text-center font-display"}>Molecular Components</h2>
            {/*    Add link Modal*/}
                    <Button
                        variant="secondary"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={() => setOpenAddLink(true)}
                    >
                        Add Link
                   </Button>

                <AddLinkModal
                    isOpen={openAddLink}
                    onClose={()=>{setOpenAddLink(false)}}
                    onAdd={(newLink) => {
                        setLinks(prev => [...prev,{...newLink,id:crypto.randomUUID()}]);
                        setOpenAddLink(false)
                    }}
                />
            {/*    Form Field*/}
                <div>
                    <FormField label="Email Address" htmlFor="email">
                        <Input id="email" type="email" />
                    </FormField>

                    <FormField
                        label="Password"
                        htmlFor="password"
                        labelAction={<a href="/forgot">Forgot password?</a>}
                    >
                        <Input id="password" type="password" />
                    </FormField>

                   {/*Dashboard editor:*/}
                    <FormField label="Display Name" htmlFor="display-name">
                        <Input id="display-name" />
                    </FormField>

                    <FormField label="Bio" htmlFor="bio">
                       <Textarea id="bio" maxLength={160} currentLength={bio.length} />
                    </FormField>

                   {/*Username onboarding:*/}
                     <FormField label="Claim your unique link" htmlFor="username">
                       <Input id="username" prefix="knotted.com/" />
                     </FormField>
                </div>

            {/*    Editable link row*/}
                <div className={"my-6 flex flex-col gap-4"}>
                    {editableLinks.map(link => (
                             <EditableLinkRow
                               key={link.id}
                               link={link}
                               onChange={handleChange}
                               onDelete={handleDelete}
                             />
                    ))}
                </div>
                {/*Nav links*/}
                <div>
                    <NavLink href="/features" active>Features</NavLink>
                    <NavLink href="/pricing">Pricing</NavLink>
                    <NavLink href="/documentation">Docs</NavLink>
                </div>
            {/*    Featurecards*/}
                <div className={"flex justify-center items-center flex-row shrink-0 gap-2"}>
                    <FeatureCard
                         icon={<AtSign className="w-6 h-6" />}
                         title="Custom username"
                         description="Claim your unique URL in seconds."
                    />
                    <FeatureCard
                        icon={<ShareIcon className={"w-6 h-6"}/>}
                        title={"One-click sharing"}
                        description={"Share your profile across all platforms easily"}
                    />
                    <FeatureCard
                        icon={<Palette className={"w-6 h-6"}/>}
                        title={"One-click sharing"}
                        description={"Share your profile across all platforms easily"}
                    />
                </div>
                {/*Public link item*/}
                <div className={"flex flex-col gap-4"}>
                    <PublicLinkItem
                        title="My Portfolio"
                        href="https://..."
                        icon={<Globe />}
                    />
                    <PublicLinkItem
                        title="My Youtube channel"
                        href="https://..."
                        icon={<Youtube />}
                    />
                    <PublicLinkItem
                        title="Buy Me a Coffee"
                        href="https://..."
                        variant="highlighted"
                    />
                </div>
            {/*    Sidebar nave item*/}
                <div className={"my-4 flex flex-col gap-4"}>
                    <SidebarNavItem
                         icon={<LayoutDashboard className="w-4 h-4" />}
                         label="Dashboard"
                         href="/dashboard"
                         active
                    />
                    <SidebarNavItem
                        icon={<Palette className="w-4 h-4" />}
                        label="Edit Page"
                        href="/editPage"
                    />
                </div>
            </section>

        </div>
    );
};

export default page;
