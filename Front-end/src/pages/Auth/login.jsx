import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Both fields are required!');
        } else {
            setError('');
            login({ email, password });
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
                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                backgroundSize: 'cover',
            }}
        >
            <Paper 
                elevation={3} 
                sx={{ 
                    padding: 4, 
                    width: '100%', 
                    maxWidth: 400,
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
            >
                <Grid container justifyContent="center" sx={{ marginBottom: 3 }}>
                    <Button
                        onClick={() => navigate('/')}
                        variant="text"
                        color="primary"
                        sx={{ textTransform: 'none' }}
                    >
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #FF8C00, #FF4500)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            CodeQuest <span role="img" aria-label="rocket">🚀</span>
                        </Typography>
                    </Button>
                </Grid>
                
                <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="#16213e">
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
                                size="large"
                                sx={{
                                    mt: 1,
                                    py: 1.5,
                                    fontSize: "16px",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    background: "linear-gradient(90deg, #FF8C00, #FF4500)",
                                    "&:hover": { 
                                        background: "linear-gradient(90deg, #FF4500, #FF8C00)" 
                                    },
                                    borderRadius: 1.5
                                }}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
                    <Typography variant="body2" color="textSecondary">
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ textDecoration: 'none', color: '#FF8C00', fontWeight: 'bold' }}>
                            Register here
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Login;