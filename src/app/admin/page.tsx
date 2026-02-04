import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import Link from "next/link";
import { Plus, LogOut, FileText } from "lucide-react";
import { logout } from "@/lib/actions";

export default async function AdminDashboard() {
  const { user, session } = await validateRequest();
  if (!session) {
    return redirect("/admin/login");
  }

  const allBlogs = await db.select().from(blogs).orderBy(blogs.createdAt);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.username}</p>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/admin/blog/new">
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Link>
            </Button>
            <form action={logout}>
              <Button variant="outline" type="submit">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </form>
          </div>
        </div>

        <div className="grid gap-6">
          <h2 className="text-xl font-semibold flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" /> Manage Posts
          </h2>
          {allBlogs.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-card">
              <p className="text-muted-foreground">No posts yet. Create your first one!</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allBlogs.map((blog) => (
                    <tr key={blog.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{blog.title}</td>
                      <td className="p-4">
                        {blog.published ? (
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full font-medium">Published</span>
                        ) : (
                          <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full font-medium">Draft</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/blog/edit/${blog.id}`}>Edit</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
