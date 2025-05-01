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
// import {  updateUser } from "../../service/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
//In this page add edit of adding linkedin and bio
const EditUser = () => {

  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    linkedin: "",
    bio: "",
    jobRole: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setIsSubmitting(true);
      updateUser(formData).then((data) => {
        alert("Updated Profile successfully");
      }).catch((error) => {
        console.log(error);
      });
      setIsSubmitting(false);
      // updateUser(formData).then((data) => {
      //   confirm("Updated Profile successfully");
      //   navigate("/user/dashboard");
      // }).catch((error) => {
      //   console.log(error);
      // });
      // setIsSubmitting(false);
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
                required
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Job Role"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                required
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
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
