const LoginForm = (props) => {
  return (
    <form action="" onSubmit={props.handleLogin}>
      <input
        type="text"
        value={props.username}
        name="username"
        placeholder="Username"
        onChange={props.handleUsernameChange}
      />
      <input
        type="password"
        value={props.password}
        name="password"
        placeholder="Password"
        onChange={props.handlePasswordChange}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
