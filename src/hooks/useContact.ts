import { useHttp } from "./useHttp";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type?: string;
}

export const useContact = () => {
  const { sendRequest, loading, error } = useHttp<{ success: boolean; message: string }>();

  const sendContactMessage = async (data: ContactData) => {
    return await sendRequest({
      method: "POST",
      url: "/api/v1/contact",
      data,
    });
  };

  return { sendContactMessage, loading, error };
};
