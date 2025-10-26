import { fetchCustomers } from "@/app/lib/data";
import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export default function Page() {
  // Keep the page synchronous and move the runtime IO into an async child
  // component wrapped by Suspense so `cacheComponents` can be enabled.
  return (
    <main>
      <CreateInvoiceContent />
    </main>
  );
}

import { Suspense } from "react";

function CreateInvoiceContent() {
  return (
    <Suspense fallback={<div>Loading invoice form...</div>}>
      {/* Async server component will fetch customers at render time */}
      <CreateInvoiceInner />
    </Suspense>
  );
}

async function CreateInvoiceInner() {
  const customers = await fetchCustomers();

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </>
  );
}
