export default function PublicProfileLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center px-5 py-10 animate-pulse">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-800 mb-5" />

            {/* Name + tagline */}
            <div className="h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2" />
            <div className="h-4 w-28 bg-slate-100 dark:bg-slate-700 rounded-lg mb-3" />

            {/* Bio */}
            <div className="space-y-2 mb-6 w-full max-w-sm">
                <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-lg w-4/5 mx-auto" />
            </div>

            {/* Links */}
            <div className="w-full max-w-sm space-y-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                ))}
            </div>
        </div>
    )
}