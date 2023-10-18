import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { val: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { val: state.val, isValid: state.val.includes("@") };
  }
  return { val: state.val, isValid: state.isValid };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { val: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { val: state.val, isValid: state.val.trim().length > 6 };
  }
  return { val: state.val, isValid: state.isValid };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [collegeNameIsValid, setCollegeNameIsValid] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollegeName, setEnteredCollegeName] = useState("");

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    val: "",
    isValid: "",
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    val: "",
    isValid: "",
  });

  const authCtx = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const collegeRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(
        emailState.isValid &&
          passwordState.isValid &&
          enteredCollegeName.trim().length !== 0
      );
    }, 1000);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid, enteredCollegeName]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateCollegeName = () => {
    setCollegeNameIsValid(enteredCollegeName.trim().length !== 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.val, passwordState.val, enteredCollegeName);
    } else if (!emailState.isValid) {
      emailRef.current.focus();
    } else if (!collegeNameIsValid) {
      collegeRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          isValid={emailState.isValid}
          label="Email"
          type="email"
          id="email"
          value={emailState.val}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={collegeRef}
          isValid={collegeNameIsValid}
          label="College Name"
          type="text"
          id="college"
          value={enteredCollegeName}
          onChange={collegeNameChangeHandler}
          onBlur={validateCollegeName}
        />
        <Input
          ref={passwordRef}
          isValid={passwordState.isValid}
          label="Password"
          type="password"
          id="password"
          value={passwordState.val}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
