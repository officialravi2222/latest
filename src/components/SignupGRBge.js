import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice';

import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {  useEffect } from 'react';


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  password: yup.string().required('Password is required')
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const userStatus = useSelector((state) => state.user.created);
  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus) {
      navigate('/signin');
    } else {
      navigate('/');
    }
  }, [userStatus]);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(registerUser({ ...data }));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} />}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Email" error={!!errors.email} helperText={errors.email?.message} />}
      />

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Phone" error={!!errors.phone} helperText={errors.phone?.message} />}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} type="password" label="Password" error={!!errors.password} helperText={errors.password?.message} />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default SignUp;