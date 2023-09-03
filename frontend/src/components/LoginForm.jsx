const LoginForm = (props) => {
  return (
    <form
      action=""
      onSubmit={props.handleLogin}
      className="grid place-content-center gap-3 "
    >
      <input
        type="text"
        value={props.username}
        name="username"
        placeholder="Username"
        onChange={props.handleUsernameChange}
        className="p-4 bg-gray-200 rounded-md"
      />
      <input
        type="password"
        value={props.password}
        name="password"
        placeholder="Password"
        onChange={props.handlePasswordChange}
        className="p-4 bg-gray-200 rounded-md"
      />

      <button
        type="submit"
        className="bg-orange-300 text-white p-5 rounded-md hover:scale-110 hover:bg-orange-400 transition-all delay-75"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
