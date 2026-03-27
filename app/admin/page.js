import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import { getDashboardData } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  description: "Admin dashboard for Mahadev Builders & Designer website management.",
};

export default async function AdminPage() {
  const data = await getDashboardData();

  if (!data.authenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard data={data} />;
}
