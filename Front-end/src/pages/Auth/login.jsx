import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { login } from '../../service/api';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Import Link component

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let { storeTokenInLS } = useAuth();
    let naivgate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Both fields are required!');
        } else {
            setError('');
            // Add your login logic here (API calls, state management, etc.)
            login({ email, password }).then((data) => {
                storeTokenInLS(data);
                naivgate('/');
            });
            console.log('Logged in with:', { email, password });
        }
    };

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f6f8',
            }}
        >
            <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </Grid>
                        {error && (
                            <Grid item>
                                <Typography color="error" variant="body2" align="center">
                                    {error}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {/* Link to Register Page */}
                <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            Register here
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Login;
