const RegisterForm = (props) => {
  return (
    <form
      action=""
      onSubmit={props.handleRegister}
      className="grid place-content-center gap-3 mt-4 "
    >
      <input
        type="text"
        value={props.username}
        placeholder="Username"
        className="p-4 bg-gray-200 rounded-md "
        onChange={props.handleUsernameChange}
      />
      <input
        type="text"
        placeholder="Name"
        className="p-4 bg-gray-200 rounded-md "
        value={props.name}
        onChange={props.handleNameChange}
      />

      <input
        type="password"
        placeholder="Password"
        className="p-4 bg-gray-200 rounded-md "
        value={props.password}
        onChange={props.handlePasswordChange}
      />
      <button className="bg-green-500 p-5 rounded-md hover:scale-105 hover:bg-green-600 transition-all delay-75 text-white">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
