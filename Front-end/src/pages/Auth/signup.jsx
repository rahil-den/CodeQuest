import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { signUp } from "../../service/api.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  useEffect(() => {
    document.title = "Registration | CodeQuest"; // Set page title
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { username: "", email: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      signUp(formData).then((data) => {
        confirm("User created successfully");
        navigate("/login");
      }).catch((error) => {
        console.log(error);
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 10,
          p: 4,
          borderRadius: 2,
          boxShadow: 5,
          background: "linear-gradient(135deg, #FFD700, #FFA500)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 2 }}>
          <img src="/react.svg" alt="CodeQuest" width={80} />
        </Box>

        <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
          Registration
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            {/* Username */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "16px",
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "#FF8C00",
                  "&:hover": { backgroundColor: "#FF4500" },
                }}
              >
                {isSubmitting ? "Registering..." : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
            {/* Link to Login page */}
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "#3f51b5" }}>
              Login here
            </Link>
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
