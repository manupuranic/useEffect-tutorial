import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

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
    isValid: true,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    val: "",
    isValid: true,
  });

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
    dispatchEmail("INPUT_BLUR");
  };

  const validatePasswordHandler = () => {
    dispatchPassword("INPUT_BLUR");
  };

  const validateCollegeName = () => {
    setCollegeNameIsValid(enteredCollegeName.trim().length !== 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.val, passwordState.val, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ""
          }`}>
          <label htmlFor="email">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeName}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
