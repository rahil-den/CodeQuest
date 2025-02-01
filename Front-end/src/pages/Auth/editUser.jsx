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
import {  updateUser } from "../../service/api.js";
import { useNavigate } from "react-router-dom";

const EditUser = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
  });

  const [errors, setErrors] = useState({
    id: 0,
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { username: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      updateUser(formData).then((data) => {
        confirm("Updated Profile successfully");
        navigate("/user/dashboard");
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
          Edit Profile
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
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EditUser;
