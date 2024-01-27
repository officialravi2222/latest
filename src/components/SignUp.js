// import * as React from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { registerUser } from '../store/userSlice';
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router';
// import { useSelector } from 'react-redux';

// const defaultTheme = createTheme();

// const schema = yup.object().shape({
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   phone: yup.string().required('Phone number is required'),
//   password: yup.string().required('Password is required')
// });

// function SignUp() {

//   const userStatus = useSelector((state) => state.user.created);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userStatus) {
//       navigate('/signin');
//     } else {
//       navigate('/');
//     }
//   }, [userStatus]);

//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // const HandleSubmit = (e) => {
//   //   localStorage.clear();
//   //   e.preventDefault();
//   //   dispatch(registerUser(formData));
//   // };
//   const { handleSubmit, control, formState } = useForm({
//     resolver: yupResolver(schema)
//   });
//   console.warn("formState",formState)
//   console.warn("formState",control)
//   const onSubmit = (data) => {
//     dispatch(registerUser({ ...data }));
//     console.log(data);
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         {/* ... (rest of your code) */}
//         <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="given-name"
//                 name="name"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label=" Name"
//                 autoFocus
//                 defaultValue={formData.name}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Phone"
//                 name="phone"
//                 autoComplete="family-name"
//                 type="number"
//                 defaultValue={formData.number}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 autoComplete="family-name"
//                 type="email"
//                 defaultValue={formData.email}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 autoComplete="family-name"
//                 type="password"
//                 defaultValue={formData.password}
//                 onChange={handleChange}
//               />
//             </Grid>
//             {/* ... (similar for other fields) */}
//           </Grid>
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Sign Up
//           </Button>
//           {/* ... (rest of your code) */}
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default SignUp;
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/userSlice';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.number().integer().positive().required('Phone is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus) {
      navigate('/signin');
    }
  }, [userStatus, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser({ ...data }));
    console.log(data);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid mb={2}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Name" fullWidth error={!!errors.name} helperText={errors.name?.message} />
              )}
            />
          </Grid>

          <Grid mb={2}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
              )}
            />
          </Grid>

          <Grid mb={2}>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Phone" fullWidth error={!!errors.phone} helperText={errors.phone?.message} />
              )}
            />
          </Grid>

          <Grid mb={2}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>

          <Grid mb={2}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </Grid>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            SignUp
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUp;
