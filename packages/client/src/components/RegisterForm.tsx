import React, { useState } from 'react';
import '../styles/register.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userSchema } from '../../../server/src/schemas/user'

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema)
      });
    
      const onSubmit = (data: any) => {
        fetch('/api/register', {
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
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <input type="text" placeholder="Username" {...register('username', {required: true, maxLength: 50})}/>
      <input type="email" placeholder="Email" {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
      <input type="password" placeholder="Password" {...register('passwordHash', {required: true, minLength: 8, maxLength: 50})}/>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;