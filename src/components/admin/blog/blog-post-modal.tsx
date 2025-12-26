"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BlogPostModalProps, JwtPayload } from "@/types/global";

const TITLE_MAX = 80;
const EXCERPT_MAX = 160;

const TAG_OPTIONS = [
  "Food",
  "Community",
  "Outreach",
  "Health",
  "Education",
  "Donation",
  "Volunteers",
  "Events",
  "Impact",
];

export default function BlogPostModal({
  isOpen,
  onClose,
  blog,
  onSave,
}: BlogPostModalProps) {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.token.token);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [readTime, setReadTime] = useState("");
  const [category, setCategory] = useState("News");
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* Populate form when editing */
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setExcerpt(blog.excerpt);
      setContent(blog.content);
      setAuthor(blog.author);
      setReadTime(blog.readTime);
      setCategory(blog.category);
      setFeatured(!!blog.featured);
      setTags(blog.tags || []);
      setPreview(blog.image || null);
    } else {
      resetForm();
    }
  }, [blog]);

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setAuthor("Admin");
    setReadTime("");
    setCategory("News");
    setFeatured(false);
    setTags([]);
    setImage(null);
    setPreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("blog token", token);
    setLoading(true);

    if (!token) {
      toast.error("Your session expired. Please login again.");
      router.push("/admin/auth/login");
      setLoading(false);
      return;
    }

    try {
      
    if (!token) {
      setLoading(false);
      onClose();
      toast.error("Login expired, redirecting...");
      router.push("/admin/auth/login");
      return;
    }
    } catch {
      toast.error("Authentication failed. Please login again.");
      router.push("/admin/auth/login");
      setLoading(false);
      return;
    }

    if (!title || !excerpt || !content || !category) {
      toast.error("Please complete all required fields.");
      setLoading(false);
      return;
    }

    if (!blog && !image) {
      toast.error("Please upload a blog image.");
      setLoading(false);
      return;
    }

    try {
      let imageBase64 = preview;

      if (image) {
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      }

      // If this blog is marked featured, unset any other featured blog
      if (featured) {
        const unsetRes = await fetch("/api/v1/admin/blog/unset-featured", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!unsetRes.ok) {
          const errBody = await unsetRes.json().catch(() => ({}));
          throw new Error(errBody.message || `Failed to unset existing featured blog (${unsetRes.status})`);
        }
      }

      const method = blog ? "PUT" : "POST";
      const url = blog
        ? `/api/v1/admin/blog/edit/${blog._id}`
        : `/api/v1/admin/blog/create`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          author,
          readTime,
          category,
          featured,
          tags,
          imageBase64,
        }),
      });

      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        router.push("/admin/auth/login");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status})`);
      }

      toast.success(blog ? "Blog updated ✨" : "Blog published 🎉");

      if (onSave) await onSave();
      onClose();
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-2xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-5">
              {blog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <Input
                value={title}
                maxLength={TITLE_MAX}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog title"
              />
              <p className="text-xs text-muted-foreground text-right">
                {title.length}/{TITLE_MAX}
              </p>

              {/* Excerpt */}
              <Textarea
                value={excerpt}
                maxLength={EXCERPT_MAX}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Short summary shown on the blog list"
              />
              <p className="text-xs text-muted-foreground text-right">
                {excerpt.length}/{EXCERPT_MAX}
              </p>

              {/* Content */}
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Write the full blog content here..."
              />

              {/* Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                />
                <Input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="Read time (e.g. 3 min read)"
                />
              </div>

              {/* Category */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Updates">Updates</SelectItem>
                  <SelectItem value="Projects">Projects</SelectItem>
                  <SelectItem value="Team">Team</SelectItem>
                  <SelectItem value="Impact">Impact</SelectItem>
                  <SelectItem value="Stories">Stories</SelectItem>
                </SelectContent>
              </Select>

              {/* Cover Image */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a clear cover image for this blog
                </p>
                {preview && (
                  <img
                    src={preview}
                    className="mt-2 h-40 w-full object-cover rounded-xl"
                  />
                )}
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={featured}
                  onCheckedChange={(val) => setFeatured(!!val)}
                />
                <span className="text-sm">Mark as featured post</span>
              </div>

              {/* Tags */}
              <div>
                <p className="text-sm font-medium mb-2">Tags</p>
                <div className="flex flex-wrap gap-3">
                  {TAG_OPTIONS.map((tag) => {
                    const active = tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition
                          ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"}
                        `}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center
                            ${active ? "bg-primary border-primary" : "border-muted-foreground"}
                          `}
                        >
                          {active && <Check size={10} />}
                        </span>
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
