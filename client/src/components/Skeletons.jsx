/* ── Skeleton card (product grid) ── */
export const SkeletonCard = () => (
    <div className="card rounded-xl overflow-hidden animate-pulse">
        <div className="shimmer h-48 bg-neutral-100" />
        <div className="p-4 space-y-3">
            <div className="shimmer h-4 rounded bg-neutral-100 w-4/5" />
            <div className="shimmer h-3 rounded bg-neutral-100 w-full" />
            <div className="shimmer h-3 rounded bg-neutral-100 w-3/5" />
            <div className="shimmer h-9 rounded-lg bg-neutral-100 mt-4" />
        </div>
    </div>
);

/* ── Skeleton detail (product detail page) ── */
export const SkeletonDetail = () => (
    <div className="min-h-screen bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="shimmer h-4 w-24 rounded mb-8 bg-neutral-200" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="shimmer rounded-xl bg-neutral-100" style={{ height: '400px' }} />
                <div className="space-y-4 pt-4">
                    <div className="shimmer h-4 rounded w-24 bg-neutral-100" />
                    <div className="shimmer h-8 rounded w-4/5 bg-neutral-100" />
                    <div className="shimmer h-8 rounded w-3/5 bg-neutral-100" />
                    <div className="shimmer h-4 rounded w-full bg-neutral-100" />
                    <div className="shimmer h-4 rounded w-full bg-neutral-100" />
                    <div className="shimmer h-4 rounded w-3/4 bg-neutral-100" />
                    <div className="shimmer h-12 rounded-xl w-full mt-6 bg-neutral-100" />
                </div>
            </div>
        </div>
    </div>
);

/* ── Skeleton category card ── */
export const SkeletonCategory = () => (
    <div className="card rounded-xl overflow-hidden animate-pulse">
        <div className="shimmer h-36 bg-neutral-100" />
        <div className="p-4">
            <div className="shimmer h-4 rounded bg-neutral-100 w-3/5 mx-auto" />
        </div>
    </div>
);
