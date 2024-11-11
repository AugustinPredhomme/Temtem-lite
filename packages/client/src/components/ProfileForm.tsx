import '../styles/profile.scss';
import useUserIdStore from './userId';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../dependancies/schemas/profile';

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
    resolver: yupResolver(profileSchema)
  });

  //Display infos
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userId', userId], 
    queryFn : async () => {
      const res = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('User check failed:', errorData.message);
        return null;
      }
      const loginData = await res.json();
      console.log('User profile checked successfully:', loginData.data);
      return loginData;
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
            const errorData = await res.json();
            console.error('User modification failed:', errorData.message);
            return;
        }
        const profileData = await res.json();
        console.log('User infos modified', profileData)
        navigate("/");
        return profileData;
    },
    onError: (error) => {
        console.error('User modification failed:', error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
          console.log('User infos modified', data);
          navigate('/');
      },
      onError: (error) => {
          console.error('User modification failed:', error);
      }
  });
      console.log(userId);
  };

  if (userId !== 0) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {data && (
              <>
                <h2>Profile</h2>
                <p>Username: {data.data.username} </p>
                <div><label>First name: </label><input type="text" placeholder={data.data.first_name} defaultValue={data.data.first_name} {...register('firstName', {maxLength: 50})}/></div>
                <label>Last name: </label><input type="text" placeholder={data.data.last_name} defaultValue={data.data.last_name} {...register('lastName', {maxLength: 50})}/>
                <p>Email: {data.data.email} </p>
                <div><label>Birthday: </label><input type="date" placeholder={data.data.birthday} defaultValue={data.data.birthday} {...register('birthday', {valueAsDate: true} )}/></div>
                <label>Country: </label><input type="text" placeholder={data.data.country} defaultValue={data.data.country} {...register('country')}/>
                <div><label>Phone: </label><input type="text" placeholder={data.data.phone} defaultValue={data.data.phone} {...register('phone')}/></div>
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