import '../styles/profile.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../dependancies/schemas/profile';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

type FormValues = {
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  country?: string;
  phone?: string;
};

const ProfileForm = () => {
  const { userId} = useUser();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(profileSchema)
  });

  const [error, setError] = useState<string | null>(null);

  //Display infos
  const { data, isLoading, isError, error: fetchError } = useQuery({
    queryKey: ['userId', userId], 
    queryFn : async () => {
      const res = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'User check failed');
      }

      return res.json();
    },
  });

  //Modify infos
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'User modification failed');
      }

      return res.json();
    },
    onSuccess: () => {
      console.log('User info modified successfully');
      navigate('/');
    },
    onError: (error: any) => {
      setError(error.message);
      console.error('User modification failed:', error.message);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(null);
    await mutation.mutateAsync(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {fetchError.message}</div>;

  if (userId === 0) {
    console.log("Access Denied");
    navigate('/');
    return null;
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        <h2>Profile</h2>
        {error && <div className="error-message">{error}</div>}
        {data && (
          <>
            <p>Username: {data.data.username} </p>

            <div>
              <label>First name: </label>
              <input 
                type="text" 
                placeholder={data.data.first_name} 
                defaultValue={data.data.first_name} 
                {...register('firstName', {maxLength: 50})}
              />
              {errors.firstName && <p className="error">{errors.firstName.message}</p>}
            </div>
            
            <div>
              <label>Last name: </label>
              <input 
                type="text" 
                placeholder={data.data.last_name} 
                defaultValue={data.data.last_name} 
                {...register('lastName', {maxLength: 50})}
              />
              {errors.lastName && <p className="error">{errors.lastName.message}</p>}
            </div>

            <p>Email: {data.data.email} </p>
            <div>
              <label>Birthday: </label>
              <input 
                type="date"
                placeholder={data.data.birthday}
                defaultValue={data.data.birthday}
                {...register('birthday', {valueAsDate: true} )}
              />
              {errors.birthday && <p className="error">{errors.birthday.message}</p>}
            </div>

            <div>
              <label>Country: </label>
              <input 
                type="text" 
                placeholder={data.data.country} 
                defaultValue={data.data.country} 
                {...register('country')}
              />
              {errors.country && <p className="error">{errors.country.message}</p>}
            </div>

            <div>
              <label>Phone: </label>
              <input 
                type="text" 
                placeholder={data.data.phone} 
                defaultValue={data.data.phone} 
                {...register('phone')}
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
            <button type="submit" disabled={mutation.status === 'pending'}>
              {mutation.status === 'pending' ? 'Updating...' : 'Update Profile'}
            </button>
          </>
        )}
      </form>
  );
};

export default ProfileForm;