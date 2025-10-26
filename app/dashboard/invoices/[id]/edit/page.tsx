import { notFound } from "next/navigation";
import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
export default async function Page(props: { params: Promise<{ id: string }> }) {
  // Await params (safe), but move database IO into a Suspense-wrapped inner
  // component so `cacheComponents` doesn't error on uncached IO at the top-level.
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <SuspenseEdit id={id} />
    </main>
  );
}

import { Suspense } from "react";

function SuspenseEdit({ id }: { id: string }) {
  return (
    <Suspense fallback={<div>Loading invoice...</div>}>
      <EditInner id={id} />
    </Suspense>
  );
}

async function EditInner({ id }: { id: string }) {
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </>
  );
}
