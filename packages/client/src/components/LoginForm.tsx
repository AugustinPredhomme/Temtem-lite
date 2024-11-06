import React, { useState } from 'react';
import '../styles/login.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userSchema } from '../../../server/src/schemas/user'

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(userSchema)
    })

    const onSubmit = (data: any) => {
        fetch('/api/login', {
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
      <input type="email" placeholder="Email" {...register('username', {required: true, pattern: /^\S+@\S+$/i})}/>
      <input type="password" placeholder="Password" {...register('passwordHash', {required: true, minLength: 8, maxLength: 50})}/>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;