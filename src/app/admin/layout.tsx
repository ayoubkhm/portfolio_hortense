import { validateSession } from "@/lib/auth";
import { cookies } from "next/headers";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin - Hortense de Ruidiaz",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");

  // If no session cookie at all, the middleware handles redirect for non-login pages.
  // For the login page, middleware allows through (no cookie required).
  // We detect login page by absence of session cookie:
  // if there is no cookie, we are either on login or being redirected by middleware.
  if (!sessionCookie) {
    // No session - render children directly (login page or middleware will redirect)
    return <>{children}</>;
  }

  // We have a cookie - validate the session
  const isValid = await validateSession();

  if (!isValid) {
    // Invalid/expired session - render children (middleware handles redirects)
    return <>{children}</>;
  }

  // Valid session - render with admin navigation
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
