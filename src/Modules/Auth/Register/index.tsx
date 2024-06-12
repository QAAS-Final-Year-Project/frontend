import { FC, useEffect } from "react";
import DeveloperForm from "./forms/developer-form";
import { useNavigate } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import TesterForm from "./forms/tester-form";
import _ from "lodash";

const RegisterForms = {
  Developer: DeveloperForm,
  Tester: TesterForm,
};

const Register: FC = () => {
  const [accountType] = useUrlState<string>("accountType");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(accountType);
    if (!accountType) {
      navigate("/account-type", {
        replace: true,
      });
    }
  }, [accountType]);

  if (!accountType) {
    return null;
  } else {
    const Form = _.get(RegisterForms, accountType);
    return <Form />;
  }
};

export default Register;