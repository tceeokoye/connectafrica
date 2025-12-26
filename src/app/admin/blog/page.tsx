"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import BlogPostModal from "@/components/admin/blog/blog-post-modal";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { setBlogs } from "@/store/slices/blogSlice";
import DeleteBlogModal from "@/components/admin/blog/deleteBlog-comfirmation-modal";
import { Blog } from "@/types/global";
import AdminLayout from "@/components/AdminLayout";

export default function AdminBlog() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const token = useSelector((state: RootState) => state.token.token);
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch blogs from API and store in Redux
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/blog/get");
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Failed to fetch blogs");
      console.log("dtatata", data.blogs);
      dispatch(setBlogs(data.blogs));
    } catch (err: any) {
      toast.error(err.message || "Failed to load blogs");
      console.log("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

  const handleView = (blog: Blog) => {
    router.push(`/admin/dashboard/blog/${blog.slug}`);
  };

  console.log("new blogs", blogs);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-muted-foreground">
              Manage and publish blog posts
            </p>
          </div>

          <Button
            onClick={() => {
              setSelectedBlog(undefined);
              setOpenModal(true);
            }}
          >
            <Plus size={18} /> New Post
          </Button>
        </motion.div>

        {/* Blog Table / Loading / Empty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-xl p-6 shadow-soft overflow-x-auto"
        >
          {loading ? (
            <div className="w-full flex justify-center items-center py-12 text-muted-foreground">
              Fetching your blogs...
            </div>
          ) : blogs.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              No blogs yet
            </p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-muted-foreground/10">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Author</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Read Time</th>
                  <th className="p-3 text-left">Featured</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-t hover:bg-muted-foreground/5"
                  >
                    <td className="p-3">{blog.title}</td>
                    <td className="p-3">{blog.author}</td>
                    <td className="p-3">{blog.category}</td>
                    <td className="p-3">{blog.readTime}</td>
                    <td className="p-3">{blog.featured ? "Yes" : "No"}</td>
                    <td className="p-3 flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(blog)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedId(blog._id);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

        {/* Blog Modal for create/edit */}
        {openModal && (
          <BlogPostModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            blog={selectedBlog}
            onSave={fetchBlogs}
          />
        )}

        <DeleteBlogModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          blogId={selectedId}
        />
      </div>
    </AdminLayout>
  );
}
