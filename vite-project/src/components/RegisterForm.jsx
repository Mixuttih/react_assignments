import useForm from '../hooks/formHooks.js';
import {useUser} from '../hooks/apiHooks.js';

const RegisterForm = () => {
  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const {postUser} = useUser();

  const doRegister = async (inputs) => {
    try {
      const registerResult = await postUser(inputs);
      console.log(registerResult);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const {handleInputChange, handleSubmit} = useForm(doRegister, initValues);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default RegisterForm
