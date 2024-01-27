import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerLogin } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.user.accessToken);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    dispatch(registerLogin(data));
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      navigate('/dashboard');
    }
  }, [accessToken]);

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {(
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : ''}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : ''}
                  />
                )}
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
