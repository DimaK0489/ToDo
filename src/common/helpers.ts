import axios from "axios";

export const showAlertError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data;

    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const firstError = data.errors[0];
      if (firstError && typeof firstError === "object" && "msg" in firstError) {
        alert(firstError.msg);
        return;
      }
    }

    if ("message" in data && typeof data.message === "string") {
      alert(data.message);
      return;
    }
  }

  alert(defaultMessage);
};

export const authentication = () => !!localStorage.getItem("token");
