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
                const errorData = await res.text();
                console.error('Login failed:', errorData);
                return;
            }
            return await res.json()
        },
        onSuccess: (loginData, variables, context) => {
            console.log(loginData.data.id);
            setUserId(loginData.data.id);
            console.log('Login successful!', variables);
            console.log("Redirect to Home Page");
            navigate("/");
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await mutation.mutateAsync(data);
        console.log(userId);
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
    return (
        <div></div>
    );
};

export default LoginForm;