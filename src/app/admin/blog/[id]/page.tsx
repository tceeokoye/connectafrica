"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import DeleteBlogModal from "@/components/admin/blog/deleteBlog-comfirmation-modal";
import { Blog } from "@/types/global";
import BlogPostModal from "@/components/admin/blog/blog-post-modal";
import { setBlogs } from "@/store/slices/blogSlice";

export default function AdminBlogView() {
  const router = useRouter();
  const params = useParams();
  const token = useSelector((state: RootState) => state.token.token);
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const blogSlug = params.slug as string;

  const blogDetails = blogs.find((blog) => blog.slug === blogSlug);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);
  const dispatch = useDispatch();

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

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
    } finally {
      setLoading(false);
    }
  };

  if (!blogDetails) return <p className="text-center py-12">Blog not found</p>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-4"
      >
        <ArrowLeft size={16} /> Back
      </Button>

      {blogDetails.image && (
        <img
          src={blogDetails.image}
          alt={blogDetails.title}
          className="w-full h-64 md:h-80 object-cover rounded-xl shadow"
        />
      )}

      <h1 className="text-3xl font-bold mt-4">{blogDetails.title}</h1>
      <p className="text-muted-foreground my-2">{blogDetails.excerpt}</p>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground my-2">
        <span>Author: {blogDetails.author}</span>
        <span>Category: {blogDetails.category}</span>
        <span>Read Time: {blogDetails.readTime}</span>
        <span>Featured: {blogDetails.featured ? "Yes" : "No"}</span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground my-2">
        {blogDetails.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-muted px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="prose max-w-full mt-4">
        <p>{blogDetails.content}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <Button onClick={() => handleEdit(blogDetails)} variant="outline">
          <Edit size={16} /> Edit
        </Button>
        <Button
          onClick={() => setIsDeleteModalOpen(true)}
          variant="destructive"
        >
          <Trash2 size={16} /> Delete
        </Button>
      </div>
      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        blogId={blogDetails?._id}
      />

      {/* Blog Modal for create/edit */}
      {openModal && (
        <BlogPostModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          blog={selectedBlog}
          onSave={fetchBlogs}
        />
      )}
    </div>
  );
}
