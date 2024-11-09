import '../styles/profile.scss';
import useUserIdStore from './userId';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../dependancies/schemas/user';

type FormValues = {
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  country?: string;
  phone?: string;
};

const ProfileForm = () => {
  const userId = useUserIdStore((state) => state.userId);
  const navigate = useNavigate();
  const { register, handleSubmit} = useForm({
    resolver: yupResolver(userSchema)
  });

  //Display infos
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile', userId], 
    queryFn : async () => {
      const res = await fetch(`http://localhost:3001/api/user/profile/${userId}`);
      const data = await res.json();
      console.log('User profile fetched successfully:', data);
      return data;
    }
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
            const errorData = await res.text();
            console.error('Login failed:', errorData);
            return;
        }
        return await res.json()
    },
    onSuccess: () => {
      console.log('User infos modified')
      navigate("/");
    },
    onError: (error) => {
        console.error('User modification failed:', error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
      await mutation.mutateAsync(data);
      console.log(userId);
  };

  if (userId !== 0) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {data && (
          <>
            <h2>Profile</h2>
            <p>Username: {data.username} </p>
            <label>First name: </label><input type="text" placeholder={data.first_name} {...register('firstName', {maxLength: 50})}/>
            <label>Last name: </label><input type="text" placeholder={data.last_name} {...register('lastName', {maxLength: 50})}/>
            <p>Email: {data.email} </p>
            <label>Birthday: </label><input type="date" placeholder={data.birthday} {...register('birthday', {valueAsDate: true} )}/>
            <label>Country: </label><input type="text" placeholder={data.country} {...register('country')}/>
            <p>Country: {data.country}</p>
            <p>Phone: {data.phone}</p>
            <input type="submit"/>
          </>
          )}
        </div>
      </form>
    );
  } else {
    console.log("Access Denied");
    navigate('/');
    return null;
  }
};

export default ProfileForm;