export const showAlertError = (error: any, defaultMessage = "Error") => {
  if (error && typeof error === "object" && "data" in error) {
    const apiError = error.data as any;
    alert(apiError?.message || defaultMessage);
  } else if (error && typeof error === "object" && "message" in error) {
    alert(error.message);
  } else {
    alert(defaultMessage);
  }
};

export const authentication = () => !!localStorage.getItem("token");
