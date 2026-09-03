'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';
import FormField from '@/components/molecular/Formfield';
import Input from '@/components/atomic/Input';
import Textarea from '@/components/atomic/Textarea';
import Button from '@/components/atomic/Button';
import Modal from '@/components/atomic/Modal';

//===========================Settings Panel ==========================================//
export interface SettingsPanelProps {
    name: string;
    setName: (value: string) => void;
    bio: string;
    setBio: (value: string) => void;

    username: string;
    onUsernameSaved: (newUsername: string) => void;

    userEmail?: string;
}

const validateUsernameFormat = (value: string): string => {
    if (value.length < 3) return 'Too short — minimum 3 characters'
    if (value.length > 30) return 'Too long — maximum 30 characters'
    if (!/^[a-z0-9_-]+$/.test(value)) return 'Only letters, numbers, _ and - allowed'
    return ''
}

const validateEmailFormat = (value: string): string => {
    if (!value.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address'
    return ''
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
                                                         name,
                                                         setName,
                                                         bio,
                                                         setBio,
                                                         username,
                                                         onUsernameSaved,
                                                         userEmail = '',
                                                     }) => {
    const router = useRouter()

    //=================== Username save state ===================//
    const [usernameInput, setUsernameInput] = useState(username)
    const [usernameError, setUsernameError] = useState('')
    const [usernameSaving, setUsernameSaving] = useState(false)
    const [usernameSuccess, setUsernameSuccess] = useState(false)

    useEffect(() => {
        setUsernameInput(username)
    }, [username])

    const trimmedUsername = usernameInput.toLowerCase().trim()
    const usernameUnchanged = trimmedUsername === username

    const handleUsernameSave = async () => {
        if (usernameUnchanged) return

        const clientError = validateUsernameFormat(trimmedUsername)
        if (clientError) {
            setUsernameError(clientError)
            return
        }

        setUsernameError('')
        setUsernameSuccess(false)
        setUsernameSaving(true)

        try {
            const res = await fetch('/api/profile/username', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: trimmedUsername }),
            })
            const data = await res.json()

            if (!res.ok) {
                setUsernameError(data.error ?? 'Could not update username')
                return
            }

            onUsernameSaved(data.username)
            setUsernameSuccess(true)
        } catch {
            setUsernameError('Network error — please try again')
        } finally {
            setUsernameSaving(false)
        }
    }

    //=================== Email save state ===================//
    const [emailInput, setEmailInput] = useState(userEmail)
    const [emailError, setEmailError] = useState('')
    const [emailSaving, setEmailSaving] = useState(false)
    const [emailPending, setEmailPending] = useState(false)

    useEffect(() => {
        setEmailInput(userEmail)
        setEmailPending(false)
    }, [userEmail])

    const trimmedEmail = emailInput.trim()
    const emailUnchanged = trimmedEmail === userEmail

    const handleEmailSave = async () => {
        if (emailUnchanged) return

        const clientError = validateEmailFormat(trimmedEmail)
        if (clientError) {
            setEmailError(clientError)
            return
        }

        setEmailError('')
        setEmailSaving(true)

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.updateUser({ email: trimmedEmail })

            if (error) {
                setEmailError(error.message)
                return
            }

            setEmailPending(true)
        } catch {
            setEmailError('Network error — please try again')
        } finally {
            setEmailSaving(false)
        }
    }

    //=================== Account deletion state ===================//
    // NEW — this section
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteConfirmInput, setDeleteConfirmInput] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState('')

    const closeDeleteModal = () => {
        if (deleting) return // preventClose already blocks this, but guard anyway
        setDeleteModalOpen(false)
        setDeleteConfirmInput('')
        setDeleteError('')
    }

    const handleDeleteAccount = async () => {
        if (deleteConfirmInput !== username) return // button is disabled until this matches

        setDeleting(true)
        setDeleteError('')

        try {
            const res = await fetch('/api/account', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ confirmUsername: deleteConfirmInput }),
            })
            const data = await res.json()

            if (!res.ok) {
                setDeleteError(data.error ?? 'Could not delete account')
                setDeleting(false)
                return
            }

            // Account is gone server-side at this point. Best-effort clear
            // of the local client session — this itself may error since
            // the user no longer exists, which is fine, ignore it.
            try {
                const supabase = createClient()
                await supabase.auth.signOut()
            } catch {
                /* ignore */
            }

            router.push('/signin')
            router.refresh()
        } catch {
            setDeleteError('Network error — please try again')
            setDeleting(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/*=========================Profile Section==========================*/}
            <section
                className={clsx(
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6'
                )}
                aria-labelledby="profile-heading"
            >
                <h2
                    id="profile-heading"
                    className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 mb-6"
                >
                    <User className="w-5 h-5 text-brand-500" aria-hidden="true" />
                    Profile
                </h2>

                <div className="flex flex-col gap-4">
                    <FormField label="Display Name" htmlFor="settings-name">
                        <Input
                            id="settings-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                        />
                    </FormField>

                    <FormField label="Bio" htmlFor="settings-bio">
                        <Textarea
                            id="settings-bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell the world about yourself..."
                            rows={4}
                            maxLength={160}
                            currentLength={bio.length}
                        />
                    </FormField>

                    <p className="text-xs font-body text-slate-400 dark:text-slate-500">
                        Changes here save together with your links — use the{' '}
                        <span className="font-semibold text-slate-500 dark:text-slate-400">
                            Publish Changes
                        </span>{' '}
                        button above.
                    </p>
                </div>
            </section>

            {/*=========================Account Settings Section==========================*/}
            <section
                className={clsx(
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-slate-100',
                    'dark:border-slate-800 p-6'
                )}
            >
                <h2
                    id="settings-heading"
                    className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center gap-2 mb-6"
                >
                    <Settings className="w-5 h-5 text-brand-500" aria-hidden="true" />
                    Account Settings
                </h2>

                <div className="flex flex-col gap-4">
                    <FormField
                        label="Email Address"
                        htmlFor="settings-email"
                        helperText={emailError || undefined}
                        isError={!!emailError}
                    >
                        <Input
                            id="settings-email"
                            type="email"
                            value={emailInput}
                            onChange={(e) => {
                                setEmailInput(e.target.value)
                                if (emailError) setEmailError('')
                            }}
                            placeholder="Your email address"
                            autoComplete="email"
                            inputState={emailError ? 'error' : 'default'}
                            disabled={emailSaving}
                        />
                    </FormField>

                    {emailPending && (
                        <p className="text-xs font-body text-brand-600 dark:text-brand-400">
                            Confirmation link sent to <strong>{trimmedEmail}</strong>. Check your
                            inbox to complete the change — your email won&apos;t update until
                            you confirm.
                        </p>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        loading={emailSaving}
                        disabled={emailUnchanged || emailInput.trim().length === 0}
                        onClick={handleEmailSave}
                        className="self-start"
                    >
                        Update Email
                    </Button>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" aria-hidden="true" />

                    <FormField
                        label="Username"
                        htmlFor="settings-username"
                        helperText={usernameError || 'Lowercase letters, numbers, _ and - only'}
                        isError={!!usernameError}
                    >
                        <Input
                            id="settings-username"
                            type="text"
                            value={usernameInput}
                            onChange={(e) => {
                                setUsernameInput(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))
                                if (usernameError) setUsernameError('')
                                setUsernameSuccess(false)
                            }}
                            prefix="knottted.vercel.app/"
                            placeholder="yourname"
                            autoComplete="off"
                            spellCheck={false}
                            inputState={usernameError ? 'error' : usernameSuccess ? 'success' : 'default'}
                            disabled={usernameSaving}
                        />
                    </FormField>

                    {usernameSuccess && (
                        <p className="text-xs font-body text-brand-600 dark:text-brand-400">
                            Username updated!
                        </p>
                    )}

                    <Button
                        variant="primary"
                        size="sm"
                        type="button"
                        loading={usernameSaving}
                        disabled={usernameUnchanged || usernameInput.trim().length === 0}
                        onClick={handleUsernameSave}
                        className="self-start"
                    >
                        Save Username
                    </Button>
                </div>
            </section>

            {/*===============================Danger Zone============================= */}
            <section
                className={clsx(
                    'bg-white dark:bg-slate-900',
                    'rounded-3xl border border-red-100',
                    'dark:border-red-900/50 p-6'
                )}
                aria-labelledby="danger-zone-heading"
            >
                <h2
                    id="danger-zone-heading"
                    className="font-display font-bold text-base text-red-600 dark:text-red-400 mb-2"
                >
                    Danger Zone
                </h2>
                <p className="font-body text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    Permanently delete your account and all your data. This cannot be undone.
                </p>

                <Button
                    variant="danger"
                    size="md"
                    type="button"
                    onClick={() => setDeleteModalOpen(true)}
                >
                    Delete Account
                </Button>
            </section>

            {/* NEW — Delete confirmation modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
                title="Delete your account"
                description="This permanently deletes your profile, all your links, and your avatar. This cannot be undone."
                size="md"
                preventClose={deleting}
                footer={
                    <>
                        <Button
                            variant="outline"
                            size="md"
                            type="button"
                            onClick={closeDeleteModal}
                            disabled={deleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            size="md"
                            type="button"
                            loading={deleting}
                            disabled={deleteConfirmInput !== username}
                            onClick={handleDeleteAccount}
                        >
                            Delete my account
                        </Button>
                    </>
                }
            >
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-body text-slate-600 dark:text-slate-300">
                        Type <span className="font-semibold text-slate-900 dark:text-white">{username}</span>{' '}
                        to confirm.
                    </p>
                    <Input
                        type="text"
                        value={deleteConfirmInput}
                        onChange={(e) => setDeleteConfirmInput(e.target.value)}
                        placeholder={username}
                        autoComplete="off"
                        spellCheck={false}
                        disabled={deleting}
                    />
                    {deleteError && (
                        <p className="text-xs font-body text-red-500" role="alert">
                            {deleteError}
                        </p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default SettingsPanel;