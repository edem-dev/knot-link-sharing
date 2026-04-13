import React from 'react';
import Link from "next/link";

const AuthFooter = () => {
    return (
        <footer className={"py-6 flex justify-center gap-6"} role={"contentinfo"}>
            {['Privacy', 'Terms', 'Support'].map(item => (
                <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}

                    // className={"text-xs font-display font-medium text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
                   className={[
                       "text-xs font-display font-medium",
                       "text-slate-400 hover:text-slate-600",
                       "uppercase tracking-widest",
                       "transition-colors",
                   ].join(" ")}
                >
                    {item}
                </Link>
            ))}
        </footer>
    );
};

export default AuthFooter;
