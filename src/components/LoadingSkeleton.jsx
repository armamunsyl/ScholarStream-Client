const LoadingSkeleton = ({ variant = 'block', rows = 4 }) => {
    const baseRow = (key) => <div key={key} className="h-4 rounded-full bg-slate-200/70" />;

    if (variant === 'table') {
        return (
            <div className="space-y-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                {Array.from({ length: rows }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className="h-4 w-1/4 rounded-full bg-slate-200/80" />
                        <div className="h-4 w-1/4 rounded-full bg-slate-200/70" />
                        <div className="h-4 flex-1 rounded-full bg-slate-200/60" />
                        <div className="h-4 w-16 rounded-full bg-slate-200/60" />
                    </div>
                ))}
            </div>
        );
    }

    if (variant === 'list') {
        return (
            <div className="space-y-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                {Array.from({ length: rows }).map((_, idx) => (
                    <div key={idx} className="h-12 rounded-2xl bg-slate-200/60" />
                ))}
            </div>
        );
    }

    return (
        <div className="animate-pulse space-y-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            {Array.from({ length: rows }).map((_, idx) => baseRow(idx))}
            <div className="h-10 rounded-2xl bg-slate-200/70" />
        </div>
    );
};

export default LoadingSkeleton;
