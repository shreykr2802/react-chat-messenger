import { FC, useState } from "react";
import { Input } from "../../atoms/Input";
import "./index.scss";
import { Button } from "../../atoms/Button";
import { User } from "../../../context/AppContext";
import { authUserWithPassword } from "../../../service";

interface LoginDetails {
  username: string;
  password: string;
}

interface IProp {
  setLoggedInUser: (value: User) => void;
}

export const Login: FC<IProp> = ({ setLoggedInUser }) => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    username: "",
    password: "",
  });

  const handleSetLoginDetails = (value: string, key: string) => {
    setLoginDetails((prevDetail) => ({ ...prevDetail, [key]: value }));
  };

  const handleLogin = async (event: Event) => {
    event.preventDefault();
    const loggedInUser = await authUserWithPassword(
      loginDetails.username,
      loginDetails.password
    );
    setLoggedInUser({
      id: loggedInUser.record.id,
      username: loggedInUser.record.username,
    });
  };

  return (
    <form className="loginForm" action="submit">
      <Input
        placeholder="username"
        type="text"
        inputType="login"
        value={loginDetails.username}
        onChange={(value) => handleSetLoginDetails(value, "username")}
      />
      <Input
        placeholder="password"
        type="password"
        inputType="login"
        value={loginDetails.password}
        onChange={(value) => handleSetLoginDetails(value, "password")}
      />
      <Button label="Login" buttonType="login" onClick={handleLogin} />
    </form>
  );
};
