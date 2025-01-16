import '../styles/login.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { userSchema } from '../dependancies/schemas/user';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { URI, PORT } from '../config/env';

type FormValues = {
    username: string;
    email: string;
    password: string;
};

const LoginForm = () => {
    const { userId, setUserId, setRole } = useUser();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm<FormValues>({
        resolver: yupResolver(userSchema)
    });

    const [ error, setError ] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: async (data: FormValues) => {
            const res = await fetch(`${URI}:${PORT}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return res.json();
        },
        onSuccess: (loginData) => {
            setUserId(loginData.data.id);
            setRole(loginData.data.role);
            console.log('Login successful! Redirecting to Home Page');
            navigate('/');
        },
        onError: (error: any) => {
            setError(error.message);
            console.error('Login failed:', error.message);
        }
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await mutation.mutateAsync(data);
    };

    if (userId !== 0) {
        return <div>You are already connected</div>
    }

    return (
        <div className='login-container'>
            <header>
            <h1>Welcome to Temtem-lite</h1>
            </header>
            <main>
            <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                <h2>Login</h2>
                {error && <div className='error-message'>{error}</div>}

                <label htmlFor='username'>Username</label>
                <input 
                id='username'
                type="text" 
                placeholder="Username" 
                {...register('username', {required: true, maxLength: 50})}
                tabIndex={0}
                />
                {errors.username && <p className='error'>{errors.username.message}</p>}

                <label htmlFor='email'>Email</label>
                <input 
                id='email'
                type="email" 
                placeholder="Email" 
                {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
                tabIndex={0}
                />
                {errors.email && <p className='error'>{errors.email.message}</p>}

                <label htmlFor='password'>Password</label>
                <input 
                id='password'
                type="password" 
                placeholder="Password" 
                {...register('password', {required: true, minLength: 8, maxLength: 50})}
                tabIndex={0}
                />
                {errors.password && <p className='error'>{errors.password.message}</p>}

                <button type="submit" disabled={mutation.status === 'pending'} tabIndex={0}>
                {mutation.status === 'pending' ? 'Logging in...' : 'Login'}
                </button>
            </form>
            </main>
        </div>
    );
};

export default LoginForm;