// store/blogsSlice.ts
import { Campaign } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CampaignsState {
  campaigns: Campaign[];
}

const initialState: CampaignsState = {
  campaigns: [],
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    setCampaigns(state, action: PayloadAction<Campaign[]>) { // payload is REQUIRED
      state.campaigns = action.payload;
    },
    addCampaign(state, action: PayloadAction<Campaign>) {
      state.campaigns.unshift(action.payload);
    },
    updateCampaign(state, action: PayloadAction<Campaign>) {
      const index = state.campaigns.findIndex(b => b._id === action.payload._id);
      if (index !== -1) state.campaigns[index] = action.payload;
    },
    deleteCampaign(state, action: PayloadAction<string>) {
      state.campaigns = state.campaigns.filter(b => b._id !== action.payload);
    },
  },
});

export const { setCampaigns, addCampaign, updateCampaign, deleteCampaign } = campaignsSlice.actions;
export default campaignsSlice.reducer;
