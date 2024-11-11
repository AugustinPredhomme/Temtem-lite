import '../styles/login.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { userSchema } from '../dependancies/schemas/user';
import { useNavigate } from 'react-router-dom';
import useUserIdStore from './userId';

type FormValues = {
    username: string;
    email: string;
    password: string;
};

const LoginForm = () => {
    const { userId, setUserId } = useUserIdStore();
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm({
        resolver: yupResolver(userSchema)
    });

    const mutation = useMutation({
        mutationFn: async (data: FormValues) => {
            const res = await fetch('http://localhost:3001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Login failed:', errorData.message);
                return;
            }
            const loginData = await res.json();
            console.log(loginData.data.id);    
            setUserId(loginData.data.id);
            console.log(userId);        
            console.log('Login successful!', loginData);
            console.log("Redirect to Home Page");
            navigate("/");

            return loginData;
        },
        onError() {
            console.error('Login failed:');
        }
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await mutation.mutateAsync(data);
    };
    if (userId === 0) {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>Login</div>
                <input type="text" placeholder="Username" {...register('username', {required: true, maxLength: 50})}/>
                <input type="email" placeholder="Email" {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
                <input type="password" placeholder="Password" {...register('password', {required: true, minLength: 8, maxLength: 50})}/>
                <input type="submit"/>
            </form>
        );
    }
    return null;
};

export default LoginForm;