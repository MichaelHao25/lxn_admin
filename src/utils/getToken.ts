import { message } from "antd";

export default (): { key: string; value: string } => {
  const currentUser = window.localStorage.getItem("currentUser");
  if (currentUser) {
    try {
      const parserCurrentUser = JSON.parse(currentUser);
      return {
        key: "Authorization",
        value: `Bearer ${parserCurrentUser.access_token}`,
      };
    } catch (error) {
      message.error("系统错误，请联系管理员");
    }
  }
  return {
    key: "",
    value: ``,
  };
};
