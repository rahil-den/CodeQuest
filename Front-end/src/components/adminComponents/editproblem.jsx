import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Chip,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { getProblemById, updateProblem } from '../../service/api.js'; // Adjust the import path if needed

const EditProblem = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get :id from the route

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    constraints: '',
    examples: '',
    testCases: '',
    solutionTemplate: '',
    tags: [],
    tagInput: '',
  });

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const problem = await getProblemById(id);
        setFormData({
          title: problem.title || '',
          description: problem.description || '',
          difficulty: problem.difficulty || '',
          constraints: problem.constraints || '',
          examples: problem.examples || '',
          testCases: problem.testCases || '',
          solutionTemplate: problem.solutionTemplate || '',
          tags: problem.tags || [],
          tagInput: '',
        });
      } catch (error) {
        setToast({ open: true, message: 'Failed to fetch problem details.', severity: 'error' });
      }
    };

    fetchProblem();
  }, [id]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleTagAdd = () => {
    if (formData.tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: '',
      }));
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const validateForm = () => {
    const requiredFields = ['title', 'description', 'difficulty', 'testCases'];
    return requiredFields.every((field) => formData[field]?.trim() !== '');
  };

  const handleSubmit = async () => {
    let parsedTestCases;
  
    try {
      parsedTestCases = JSON.parse(formData.testCases);
    } catch (err) {
      setToast({ open: true, message: 'Invalid JSON in test cases!', severity: 'error' });
      return;
    }
  
    const payload = {
      ...formData,
      testCases: formData.testCases,
      tags: formData.tags,
    };
  
    try {
      console.log('Updating Problem Payload:', payload);
      await updateProblem(id, payload); // Pass id for updating
      setToast({ open: true, message: 'Problem updated successfully!', severity: 'success' });
      setTimeout(() => navigate('/admin/dashboard/allproblems'), 1500);
    } catch (error) {
      setToast({ open: true, message: error.message || 'Failed to update problem.', severity: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <AdminHeader />
      <div className="flex flex-1 relative">
        <AdminSidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Edit Problem</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                required
                value={formData.title}
                onChange={handleChange('title')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={4}
                required
                value={formData.description}
                onChange={handleChange('description')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Difficulty"
                select
                fullWidth
                required
                value={formData.difficulty}
                onChange={handleChange('difficulty')}
              >
                {['Easy', 'Medium', 'Hard'].map((level) => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Constraints"
                fullWidth
                multiline
                minRows={2}
                value={formData.constraints}
                onChange={handleChange('constraints')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Examples"
                fullWidth
                multiline
                minRows={2}
                value={formData.examples}
                onChange={handleChange('examples')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Test Cases (JSON Format)"
                fullWidth
                multiline
                minRows={3}
                required
                value={formData.testCases}
                onChange={handleChange('testCases')}
                helperText='Example: [{"input":{"nums":[2,7,11,15],"target":9},"output":[0,1]}]'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Solution Template"
                fullWidth
                multiline
                minRows={3}
                value={formData.solutionTemplate}
                onChange={handleChange('solutionTemplate')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Add Tag"
                value={formData.tagInput}
                onChange={handleChange('tagInput')}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
              />
              <Button onClick={handleTagAdd} sx={{ ml: 1 }}>Add</Button>
              <div style={{ marginTop: '10px' }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagDelete(tag)}
                    sx={{ mr: 1, mt: 1 }}
                  />
                ))}
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => validateForm() ? setConfirmOpen(true) : setToast({ open: true, message: 'Please fill all required fields', severity: 'warning' })}
              >
                Update Problem
              </Button>
            </Grid>
          </Grid>
        </main>
      </div>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
      />

      {/* Confirmation Modal */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          Are you sure you want to update this problem?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={() => { setConfirmOpen(false); handleSubmit(); }} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProblem;
