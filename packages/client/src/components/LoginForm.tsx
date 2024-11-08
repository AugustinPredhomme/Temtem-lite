import '../styles/login.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../dependancies/schemas/user'

const LoginForm = () => {
    const { register, handleSubmit} = useForm({
        resolver: yupResolver(userSchema)
    })

    const onSubmit = (data: any) => {
        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log('Login successful!');
            } else {
                console.log('Login failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div>Login</div>
        <input type="text" placeholder="Username" {...register('username', {required: true, maxLength: 50})}/>
        <input type="email" placeholder="Email" {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
        <input type="password" placeholder="Password" {...register('password', {required: true, minLength: 8, maxLength: 50})}/>
        <input type="submit"/>
    </form>
  );
};

export default LoginForm;