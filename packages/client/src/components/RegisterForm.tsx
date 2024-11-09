import '../styles/register.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../dependancies/schemas/user';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './isAuthenticated';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(userSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Registration Failed:', data.message);
        return;
      }
      console.log('Registration successful!', data);
      console.log("Redirect to Home Page");
      navigate("/login");
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await mutation.mutateAsync(data);
  };
  if (!isAuthenticated) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Register</div>
          <input type="text" placeholder="Username" {...register('username', { required: true, maxLength: 50 })}/>
          <input type="email" placeholder="Email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })}/>
          <input type="password" placeholder="Password" {...register('password', { required: true, minLength: 8, maxLength: 50 })}/>
          <input type="submit" />
      </form>
    );
  }
  return (
    <div></div>
  );
};

export default RegisterForm;