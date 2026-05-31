export default function Loading() {
    return (
        <div className="min-h-screen bg-surface">
            {/* Page header skeleton */}
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <div className="mb-sm h-4 w-20 animate-pulse rounded bg-surface-container-highest" />
                    <div className="mb-sm h-10 w-64 animate-pulse rounded bg-surface-container-highest" />
                    <div className="h-4 w-96 max-w-full animate-pulse rounded bg-surface-container-high" />
                </div>
            </div>

            {/* Content skeleton */}
            <div className="mx-auto max-w-7xl px-gutter pt-xl">
                <div className="flex gap-10 lg:gap-14">
                    {/* Sidebar skeleton */}
                    <div className="hidden w-60 flex-shrink-0 space-y-4 pt-2 lg:block">
                        {[120, 90, 100, 80].map((w, i) => (
                            <div
                                key={i}
                                className="animate-pulse rounded bg-surface-container-high"
                                style={{ height: "12px", width: `${w}px` }}
                            />
                        ))}
                    </div>

                    {/* Product grid skeleton */}
                    <div className="min-w-0 flex-1">
                        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="aspect-[4/5] animate-pulse rounded-lg bg-surface-container-high" />
                                    <div className="h-5 w-3/4 animate-pulse rounded bg-surface-container-high" />
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-surface-container-highest" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
