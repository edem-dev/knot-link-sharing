'use client';

import React from 'react';
import { clsx } from 'clsx';
import { Settings } from 'lucide-react';

import FormField from '@/components/molecular/Formfield';
import Input from '@/components/atomic/Input';
import Button from '@/components/atomic/Button';

//===========================Settings Panel ==========================================//
// Shared between Desktop `DashboardPage` and `MobileDashboardPage`.
// Shown when activePath === '/settings'.
const SettingsPanel: React.FC = () => (
    <div className="flex flex-col gap-6">
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

            {/*========================Settings Section ==========================*/}
            <div className="flex flex-col gap-4">
                {/*
                  MOLECULE: FormField + ATOM: Input — Email
                  defaultValue → uncontrolled for this demo.
                  TODO: In production: make this controlled with its own useState.
                */}
                <FormField label="Email Address" htmlFor="settings-email">
                    <Input
                        id="settings-email"
                        type="email"
                        value=""
                        defaultValue="alex@example.com"
                        placeholder="Your email address"
                        autoComplete="email"
                    />
                </FormField>

                {/*
                  MOLECULE: FormField + ATOM: Input — Username
                  defaultValue → uncontrolled for this demo.
                  TODO: In production: make this controlled with its own useState.
                */}
                <FormField label="Username" htmlFor="settings-username">
                    <Input
                        id="settings-username"
                        type="text"
                        defaultValue="alexrivers"
                        prefix="knottted.vercel.app/"
                        placeholder="yourname"
                        autoComplete="off"
                        spellCheck={false}
                    />
                </FormField>

                {/*======================Save Changes Button======================*/}
                <Button
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={() => {/* TODO: PATCH /api/settings */}}
                >
                    Save Changes
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
            {/*=========================Danger Zone Heading=========================*/}
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
                onClick={() => { /* TODO: open confirmation Modal → DELETE /api/account */ }}
            >
                Delete Account
            </Button>
        </section>
    </div>
);

export default SettingsPanel;
