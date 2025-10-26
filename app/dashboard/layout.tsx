import SideNav from "@/app/ui/dashboard/sidenav";
import { Suspense } from "react";

// `experimental_ppr` (route segment config) was removed in Next 16.
// It has been merged into the top-level `cacheComponents` flag in
// `next.config.ts`. Remove the export to avoid build-time errors.

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      {/* Wrap page children in Suspense so runtime IO in nested components is
          inside a fallback when `cacheComponents` is enabled. This prevents the
          "Uncached data was accessed outside of <Suspense>" error for pages
          that perform uncached IO during render. */}
      <div className="grow p-6 md:overflow-y-auto md:p-12">
        <Suspense fallback={<div className="text-center">Loading…</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
