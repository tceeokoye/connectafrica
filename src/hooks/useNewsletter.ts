import { useHttp } from "./useHttp";

interface NewsletterResponse {
  success: boolean;
  message: string;
}

export const useNewsletter = () => {
  const { sendRequest, loading, error } = useHttp<NewsletterResponse>();

  const subscribe = async (email: string) => {
    return await sendRequest({
      method: "POST",
      url: "/api/v1/user/newsletter/subscribe",
      data: { email },
    });
  };

  return { subscribe, loading, error };
};
