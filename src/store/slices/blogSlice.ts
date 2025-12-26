// store/blogsSlice.ts
import { Blog } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface BlogsState {
  blogs: Blog[];
}

const initialState: BlogsState = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
    },
    addBlog(state, action: PayloadAction<Blog>) {
      state.blogs.unshift(action.payload);
    },
    updateBlog(state, action: PayloadAction<Blog>) {
      const index = state.blogs.findIndex(b => b._id === action.payload._id);
      if (index !== -1) state.blogs[index] = action.payload;
    },
    deleteBlog(state, action: PayloadAction<string>) {
      state.blogs = state.blogs.filter(b => b._id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
