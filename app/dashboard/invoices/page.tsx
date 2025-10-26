import { Suspense } from "react";

import { Metadata } from "next";
import Search from "@/app/ui/search";
import { lusitana } from "@/app/ui/fonts";
import Table from "@/app/ui/invoices/table";
import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // await only for search params (small sync-like promise). Do NOT await
  // database or network IO at the top-level when `cacheComponents` is enabled
  // — move that IO into a nested async component that is wrapped by
  // <Suspense> so Next can provide a fallback while the runtime fetches data.
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      {/* Outer suspense covers the content that performs uncached IO at runtime */}
      <Suspense fallback={<InvoicesTableSkeleton />}>
        {/* InvoicesContent is an async server component that does the runtime IO */}
        <InvoicesContent query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}

async function InvoicesContent({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // This IO happens inside the Suspense boundary so it's compatible with
  // cacheComponents: true (PPR). If you want this data cached for prerendering
  // later, add `"use cache"` and cacheTag/cacheLife in the data layer.
  const totalPages = await fetchInvoicesPages(query);

  return (
    <>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
