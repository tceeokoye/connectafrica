"use client"
import React from 'react'
import Modal from './Modal'
import { useHttp } from '@/hooks/useHttp'
import { useToast } from '@/hooks/use-toast'

const ALLOWED_CATEGORIES = [
  'News',
  'Events',
  'Updates',
  'Projects',
  'Team',
  'Impact',
  'Stories',
]

type Post = {
  _id?: string
  slug?: string
  title: string
  excerpt: string
  date?: string
  image?: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  current?: Post | null
  onCreated?: (blog: any) => void
}

export default function AdminBlogModal({ isOpen, onClose, current = null, onCreated }: Props) {
  const { sendRequest } = useHttp<any>()
  const { toast } = useToast()

  const TITLE_MAX = 100
  const EXCERPT_MAX = 300

  const [formTitle, setFormTitle] = React.useState('')
  const [formExcerpt, setFormExcerpt] = React.useState('')
  const [formContent, setFormContent] = React.useState('')
  const [formAuthor, setFormAuthor] = React.useState('Admin')
  const [formReadTime, setFormReadTime] = React.useState('3 min read')
  const [formCategory, setFormCategory] = React.useState(ALLOWED_CATEGORIES[0])
  const [formTagsRaw, setFormTagsRaw] = React.useState('')
  const [formFeatured, setFormFeatured] = React.useState(false)
  const [formImageFile, setFormImageFile] = React.useState<File | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      if (current) {
        setFormTitle(current.title || '')
        setFormExcerpt(current.excerpt || '')
        setFormContent((current as any).content || '')
        setFormAuthor((current as any).author || 'Admin')
        setFormReadTime((current as any).readTime || '3 min read')
        setFormCategory((current as any).category || ALLOWED_CATEGORIES[0])
        setFormTagsRaw(((current as any).tags || []).join(', '))
        setFormFeatured(!!(current as any).featured)
        setFormImageFile(null)
      } else {
        setFormTitle('')
        setFormExcerpt('')
        setFormContent('')
        setFormAuthor('Admin')
        setFormReadTime('3 min read')
        setFormCategory(ALLOWED_CATEGORIES[0])
        setFormTagsRaw('')
        setFormFeatured(false)
        setFormImageFile(null)
      }
    }
  }, [isOpen, current])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const title = formTitle.trim()
    const excerpt = formExcerpt.trim()
    const content = formContent.trim()
    const author = formAuthor.trim()
    const readTime = formReadTime.trim()
    const category = formCategory
    const tagsRaw = formTagsRaw
    const featured = formFeatured
    const file = formImageFile

    if (!title || !excerpt || !content || !file || !category) {
      toast({ title: 'Missing fields', description: 'Please fill all required fields and provide an image.' })
      return
    }

    if (title.length > TITLE_MAX) {
      toast({ title: 'Title too long', description: `Title must be ${TITLE_MAX} characters or fewer.` })
      return
    }

    if (excerpt.length > EXCERPT_MAX) {
      toast({ title: 'Excerpt too long', description: `Excerpt must be ${EXCERPT_MAX} characters or fewer.` })
      return
    }

    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (err) => reject(err)
        reader.readAsDataURL(file)
      })

    setSubmitting(true)
    try {
      const imageBase64 = await toBase64(file)
      const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : []

      const payload = { title, excerpt, content, author, readTime, category, imageBase64, tags, featured }
      const res = await sendRequest({ url: '/api/v1/admin/blog/create', method: 'POST', data: payload })

      if (res?.success) {
        toast({ title: 'Blog created', description: 'Blog created successfully.' })
        if (res.blog && onCreated) onCreated(res.blog)
        onClose()
      } else {
        toast({ title: 'Error', description: res?.message || 'Failed to create blog.' })
      }
    } catch (err: any) {
      console.error('Create blog error:', err)
      toast({ title: 'Error', description: err?.response?.data?.message || err?.message || 'Failed to create blog.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} title={current ? 'Edit Post' : 'New Post'} onClose={onClose}>
      <form onSubmit={handleSave} className="space-y-3">
        <input name="title" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" required maxLength={TITLE_MAX} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Max {TITLE_MAX} characters</span>
          <span>{TITLE_MAX - formTitle.length} characters left</span>
        </div>
        <input name="excerpt" value={formExcerpt} onChange={(e) => setFormExcerpt(e.target.value)} placeholder="Excerpt" className="w-full p-2 border rounded" required maxLength={EXCERPT_MAX} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Max {EXCERPT_MAX} characters</span>
          <span>{EXCERPT_MAX - formExcerpt.length} characters left</span>
        </div>
        <textarea name="content" value={formContent} onChange={(e) => setFormContent(e.target.value)} placeholder="Content" className="w-full p-2 border rounded" required />
        <input name="author" value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} placeholder="Author" className="w-full p-2 border rounded" />
        <input name="readTime" value={formReadTime} onChange={(e) => setFormReadTime(e.target.value)} placeholder="Read time" className="w-full p-2 border rounded" />

        <select name="category" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full p-2 border rounded" required>
          {ALLOWED_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input name="tags" value={formTagsRaw} onChange={(e) => setFormTagsRaw(e.target.value)} placeholder="tag1, tag2" className="w-full p-2 border rounded" />

        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="featured" checked={formFeatured} onChange={(e) => setFormFeatured(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm">Featured</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input type="file" name="image" accept="image/*" onChange={(e) => setFormImageFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1">Cancel</button>
          <button type="submit" disabled={submitting} className="px-3 py-1 bg-green-600 text-white rounded">{submitting ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </Modal>
  )
}
