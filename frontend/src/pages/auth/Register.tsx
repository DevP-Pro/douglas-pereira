import React from 'react';
import { Box, Button, TextField, Link, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (response.data) {
        navigate('/login'); // Redireciona para a página de login após o registro bem-sucedido
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      {/* Área do formulário de registro */}
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
            Sign up
          </Typography>
          <Typography variant="body2" gutterBottom>
            Already have an account? <Link href="/login">Sign in</Link>
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              variant="outlined"
              {...register('firstName', { required: 'First name is required' })}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message as string}
            />
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              variant="outlined"
              {...register('lastName', { required: 'Last name is required' })}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message as string}
            />
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
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
              Sign up
            </Button>
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
          backgroundColor: '#122647',
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

export default RegisterPage;
