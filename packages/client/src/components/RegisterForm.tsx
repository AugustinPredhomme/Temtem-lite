import '../styles/register.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../dependancies/schemas/user'

type FormValues = {
  username: string
  email: string
  password: string
}

const RegisterForm = () => {
    const { register, handleSubmit} = useForm({
      defaultValues: {
        'username': '',
        'email': '',
        'password': ''
      },
        resolver: yupResolver(userSchema)
      });
    
      const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(JSON.stringify(data)); // A Retirer

        fetch('http://localhost:3001/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            console.log('Registration successful!');
          } else {
            console.error('Registration failed:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Register</div>
      <input type="text" placeholder="Username" {...register('username', {required: true, maxLength: 50})}/>
      <input type="email" placeholder="Email" {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
      <input type="password" placeholder="Password" {...register('password', {required: true, minLength: 8, maxLength: 50})}/>
      <input type="submit"/>
    </form>
  );
};

export default RegisterForm;