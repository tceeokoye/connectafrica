// store/blogsSlice.ts
import { MediaItem } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface GalleryState {
  gallery: MediaItem[];
}

const initialState: GalleryState = {
  gallery: [],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGallery(state, action: PayloadAction<MediaItem[]>) {
      state.gallery = action.payload;
    },
    addGallery(state, action: PayloadAction<MediaItem>) {
      state.gallery.unshift(action.payload);
    },
    updateGallery(state, action: PayloadAction<MediaItem>) {
      const index = state.gallery.findIndex(b => b._id === action.payload._id);
      if (index !== -1) state.gallery[index] = action.payload;
    },
    deleteGallery(state, action: PayloadAction<string>) {
      state.gallery = state.gallery.filter(b => b._id !== action.payload);
    },
  },
});

export const { setGallery, addGallery, updateGallery, deleteGallery } = gallerySlice.actions;
export default gallerySlice.reducer;
