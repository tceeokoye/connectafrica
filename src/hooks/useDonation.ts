import { useHttp } from "./useHttp";

interface DonationData {
  name: string;
  email: string;
  phone?: string;
  amount: number;
  donationType?: "one-time" | "monthly";
  designation?: string;
}

interface DonationResponse {
  success: boolean;
  checkoutUrl?: string;
  reference?: string;
  message: string;
}

export const useDonation = () => {
  const { sendRequest, loading, error } = useHttp<DonationResponse>();

  const initiateDonation = async (data: DonationData) => {
    return await sendRequest({
      method: "POST",
      url: "/api/v1/user/donations/initiate",
      data,
    });
  };

  return { initiateDonation, loading, error };
};
