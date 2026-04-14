import React from 'react';

const VerifyEmailPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md text-center">
                <div className="text-5xl mb-6">📬</div>
                <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mb-3">
                    Check your inbox
                </h1>
                <p className="font-body text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-2">
                    We sent a verification link to your email address.
                </p>
                <p className="font-body text-slate-400 text-sm">
                    Click the link in the email to continue to Knotted.
                    The link expires in 10 minutes.
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
