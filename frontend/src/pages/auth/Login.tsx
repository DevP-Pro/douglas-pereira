import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Link, TextField, Typography, useTheme } from '@mui/material';

const LoginPage = () => {
  const theme = useTheme();

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
          <TextField
            fullWidth
            label="Email address"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{ mt: 1 }}
          />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            Sign in
          </Button>
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
