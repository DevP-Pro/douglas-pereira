import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Link, TextField, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: data.email,
        password: data.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      {/* Área do formulário de login */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.paper',
          padding: theme.spacing(4),
        }}
      >
        <Box maxWidth="400px" width="100%">
          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>
          <Typography variant="body2" gutterBottom>
            Don't have an account? <Link href="#">Sign up</Link>
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              fullWidth
              label="Email address"
              margin="normal"
              variant="outlined"
              {...register('email', { required: 'Email is required' })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message as string}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              {...register('password', { required: 'Password is required' })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message as string}
            />
            <FormControlLabel
              control={<Checkbox {...register('rememberMe')} />}
              label="Remember me"
              sx={{ mt: 1 }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
              Sign in
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Área da imagem */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#122647', // Cor de fundo para o lado direito
        }}
      >
        <Box
          component="img"
          src="https://material-kit-react.devias.io/assets/auth-widgets.png"
          alt="Auth Widgets"
          sx={{
            maxWidth: '100%',
            width: '600px',
            height: 'auto',
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
