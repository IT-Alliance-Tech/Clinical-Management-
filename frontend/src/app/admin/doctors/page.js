"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Container,
  TableContainer,
  InputLabel,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import FilterListIcon from "@mui/icons-material/FilterList";

import { apiRequest } from "@/config/api";
import { useRouter } from "next/navigation";

/* ---------------- IMPROVED LIGHT THEME ---------------- */
const fixedLightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    primary: {
      main: "#2e7d32",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

/* ---------------- CONSTANTS ---------------- */
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SPECIALIZATIONS = [
  "General Practitioner",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedist",
  "Pediatrician",
  "Psychiatrist",
  "Dentist",
  "Eye Specialist",
  "ENT Specialist",
  "Other",
];

/* ---------------- COMPONENT ---------------- */
export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    consultationFee: "",
    availability: {
      days: [],
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: 30,
    },
    isActive: true,
  });

  const [filters, setFilters] = useState({
    search: "",
    specialization: "",
    status: "all",
    minExperience: "",
    maxExperience: "",
    minFee: "",
    maxFee: "",
    availableDay: "",
  });

  /* ---------------- FETCH ---------------- */
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await apiRequest("/api/doctors/admin/all");
      setDoctors(res.data || []);
    } catch {
      alert("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const openAddDialog = () => {
    setEditingDoctor(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
      consultationFee: "",
      availability: {
        days: [],
        startTime: "09:00",
        endTime: "17:00",
        slotDuration: 30,
      },
      isActive: true,
    });
    setOpenDialog(true);
  };

  const openEditDialog = (doc) => {
    setEditingDoctor(doc);
    setForm({
      ...doc,
      experience: doc.experience.toString(),
      consultationFee: doc.consultationFee.toString(),
    });
    setOpenDialog(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("availability.")) {
      const field = name.split(".")[1];
      setForm((p) => ({
        ...p,
        availability: {
          ...p.availability,
          [field]: field === "slotDuration" ? Number(value) : value,
        },
      }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const toggleDay = (day) => {
    setForm((p) => ({
      ...p,
      availability: {
        ...p.availability,
        days: p.availability.days.includes(day)
          ? p.availability.days.filter((d) => d !== day)
          : [...p.availability.days, day],
      },
    }));
  };

  const submitDoctor = async () => {
    const payload = {
      ...form,
      experience: Number(form.experience),
      consultationFee: Number(form.consultationFee),
    };

    const endpoint = editingDoctor
      ? `/api/doctors/${editingDoctor._id}`
      : `/api/doctors`;

    const method = editingDoctor ? "PUT" : "POST";

    await apiRequest(endpoint, {
      method,
      body: JSON.stringify(payload),
    });

    setOpenDialog(false);
    fetchDoctors();
  };

  const toggleStatus = async (doc) => {
    await apiRequest(`/api/doctors/${doc._id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ isActive: !doc.isActive }),
    });
    fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    await apiRequest(`/api/doctors/${id}`, { method: "DELETE" });
    fetchDoctors();
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      specialization: "",
      status: "all",
      minExperience: "",
      maxExperience: "",
      minFee: "",
      maxFee: "",
      availableDay: "",
    });
  };

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredDoctors = doctors.filter((doc) => {
    const minExp = filters.minExperience ? Number(filters.minExperience) : null;
    const maxExp = filters.maxExperience ? Number(filters.maxExperience) : null;
    const minFee = filters.minFee ? Number(filters.minFee) : null;
    const maxFee = filters.maxFee ? Number(filters.maxFee) : null;

    return (
      doc.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.specialization === "" ||
        doc.specialization === filters.specialization) &&
      (filters.status === "all" ||
        (filters.status === "active" && doc.isActive) ||
        (filters.status === "inactive" && !doc.isActive)) &&
      (minExp === null || doc.experience >= minExp) &&
      (maxExp === null || doc.experience <= maxExp) &&
      (minFee === null || doc.consultationFee >= minFee) &&
      (maxFee === null || doc.consultationFee <= maxFee) &&
      (filters.availableDay === "" ||
        doc.availability?.days?.includes(filters.availableDay))
    );
  });

  /* ---------------- UI ---------------- */
  return (
    <ThemeProvider theme={fixedLightTheme}>
      <CssBaseline />

      <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
        <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 4 } }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => router.back()}
              sx={{
                mb: 2,
                borderRadius: 2,
                px: 2,
                borderColor: "#2e7d32",
                color: "#2e7d32",
                "&:hover": {
                  borderColor: "#1b5e20",
                  backgroundColor: "#f1f8f4",
                },
              }}
            >
              ← Back to Dashboard
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#1a1a1a",
                    mb: 0.5,
                  }}
                >
                  👨‍⚕️ Doctor Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage doctor profiles and availability
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Chip
                  label={`${filteredDoctors.length} Doctors`}
                  sx={{
                    backgroundColor: "#2e7d32",
                    color: "#fff",
                    fontWeight: 600,
                    px: 2,
                    py: 2.5,
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={openAddDialog}
                  sx={{
                    backgroundColor: "#2e7d32",
                    "&:hover": {
                      backgroundColor: "#1b5e20",
                    },
                  }}
                >
                  Add Doctor
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Filters Card */}
          <Card sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <FilterListIcon sx={{ mr: 1, color: "#2e7d32" }} />
                <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                  Filter Doctors
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={clearFilters}
                  sx={{
                    borderColor: "#2e7d32",
                    color: "#2e7d32",
                    "&:hover": {
                      borderColor: "#1b5e20",
                      backgroundColor: "#f1f8f4",
                    },
                  }}
                >
                  Reset Filters
                </Button>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Search by Name"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel shrink>Specialization</InputLabel>
                    <Select
                      value={filters.specialization}
                      label="Specialization"
                      displayEmpty
                      notched
                      onChange={(e) =>
                        setFilters({ ...filters, specialization: e.target.value })
                      }
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Specializations</MenuItem>
                      {SPECIALIZATIONS.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel shrink>Status</InputLabel>
                    <Select
                      value={filters.status}
                      label="Status"
                      displayEmpty
                      notched
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel shrink>Available Day</InputLabel>
                    <Select
                      value={filters.availableDay}
                      label="Available Day"
                      displayEmpty
                      notched
                      onChange={(e) =>
                        setFilters({ ...filters, availableDay: e.target.value })
                      }
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Days</MenuItem>
                      {DAYS.map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Min Experience"
                    value={filters.minExperience}
                    onChange={(e) =>
                      setFilters({ ...filters, minExperience: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Max Experience"
                    value={filters.maxExperience}
                    onChange={(e) =>
                      setFilters({ ...filters, maxExperience: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Min Fee (₹)"
                    value={filters.minFee}
                    onChange={(e) =>
                      setFilters({ ...filters, minFee: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Max Fee (₹)"
                    value={filters.maxFee}
                    onChange={(e) =>
                      setFilters({ ...filters, maxFee: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                Showing {filteredDoctors.length} of {doctors.length} doctors
              </Typography>
            </CardContent>
          </Card>

          {/* Table Card */}
          <Card sx={{ border: "1px solid #e0e0e0" }}>
            <CardContent sx={{ p: 0 }}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table sx={{ minWidth: 1200 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8faf9" }}>
                        <TableCell sx={{ fontWeight: 700, py: 2 }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Specialization
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Experience
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Fee</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Available Days
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Timings</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="center">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredDoctors.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} align="center" sx={{ py: 8 }}>
                            <Typography color="text.secondary">
                              No doctors found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDoctors.map((doc) => (
                          <TableRow
                            key={doc._id}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#f9fafb",
                              },
                            }}
                          >
                            <TableCell sx={{ fontWeight: 500 }}>
                              {doc.name}
                            </TableCell>
                            <TableCell>{doc.email}</TableCell>
                            <TableCell>{doc.phone}</TableCell>
                            <TableCell>
                              <Chip
                                label={doc.specialization}
                                size="small"
                                sx={{
                                  backgroundColor: "#e8f5e9",
                                  color: "#2e7d32",
                                  fontWeight: 500,
                                }}
                              />
                            </TableCell>
                            <TableCell>{doc.experience} years</TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>
                              ₹{doc.consultationFee}
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 0.5,
                                  flexWrap: "wrap",
                                }}
                              >
                                {(doc.availability?.days || []).map((day) => (
                                  <Chip
                                    key={day}
                                    label={day.slice(0, 3)}
                                    size="small"
                                    sx={{
                                      backgroundColor: "#f0f0f0",
                                      fontSize: "0.7rem",
                                    }}
                                  />
                                ))}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {doc.availability?.startTime} -{" "}
                                {doc.availability?.endTime}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                ({doc.availability?.slotDuration} min slots)
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={doc.isActive ? "Active" : "Inactive"}
                                size="small"
                                sx={{
                                  backgroundColor: doc.isActive
                                    ? "#2e7d32"
                                    : "#9e9e9e",
                                  color: "#fff",
                                  fontWeight: 600,
                                  minWidth: 70,
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 0.5,
                                  justifyContent: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                                <Button
                                  size="small"
                                  onClick={() => openEditDialog(doc)}
                                  sx={{
                                    minWidth: "auto",
                                    p: 1,
                                    color: "#2e7d32",
                                    "&:hover": {
                                      backgroundColor: "#e8f5e9",
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </Button>
                                <Button
                                  size="small"
                                  onClick={() => toggleStatus(doc)}
                                  sx={{
                                    minWidth: "auto",
                                    p: 1,
                                    color: doc.isActive ? "#ed6c02" : "#2e7d32",
                                    "&:hover": {
                                      backgroundColor: doc.isActive
                                        ? "#fff3e0"
                                        : "#e8f5e9",
                                    },
                                  }}
                                >
                                  {doc.isActive ? (
                                    <ToggleOffIcon fontSize="small" />
                                  ) : (
                                    <ToggleOnIcon fontSize="small" />
                                  )}
                                </Button>
                                <Button
                                  size="small"
                                  onClick={() => deleteDoctor(doc._id)}
                                  sx={{
                                    minWidth: "auto",
                                    p: 1,
                                    color: "#d32f2f",
                                    "&:hover": {
                                      backgroundColor: "#ffebee",
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>

          {/* Add/Edit Dialog */}
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
              },
            }}
          >
            <DialogTitle
              sx={{ pb: 1, fontWeight: 700, fontSize: "1.25rem" }}
            >
              {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
            </DialogTitle>

            <DialogContent dividers sx={{ py: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Specialization</InputLabel>
                    <Select
                      name="specialization"
                      value={form.specialization}
                      label="Specialization"
                      onChange={handleChange}
                    >
                      {SPECIALIZATIONS.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Experience (Years)"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Consultation Fee (₹)"
                    name="consultationFee"
                    value={form.consultationFee}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Typography sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
                Available Days
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                {DAYS.map((d) => (
                  <Chip
                    key={d}
                    label={d}
                    clickable
                    onClick={() => toggleDay(d)}
                    sx={{
                      backgroundColor: form.availability.days.includes(d)
                        ? "#2e7d32"
                        : "#f0f0f0",
                      color: form.availability.days.includes(d)
                        ? "#fff"
                        : "#666",
                      fontWeight: form.availability.days.includes(d)
                        ? 600
                        : 400,
                      "&:hover": {
                        backgroundColor: form.availability.days.includes(d)
                          ? "#1b5e20"
                          : "#e0e0e0",
                      },
                    }}
                  />
                ))}
              </Box>

              <Typography sx={{ mb: 1, fontWeight: 600 }}>
                Consultation Timings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Start Time"
                    name="availability.startTime"
                    value={form.availability.startTime}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="time"
                    label="End Time"
                    name="availability.endTime"
                    value={form.availability.endTime}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Slot Duration</InputLabel>
                    <Select
                      name="availability.slotDuration"
                      value={form.availability.slotDuration}
                      label="Slot Duration"
                      onChange={handleChange}
                    >
                      <MenuItem value={15}>15 minutes</MenuItem>
                      <MenuItem value={30}>30 minutes</MenuItem>
                      <MenuItem value={45}>45 minutes</MenuItem>
                      <MenuItem value={60}>60 minutes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <FormControlLabel
                sx={{ mt: 3 }}
                control={
                  <Switch
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, isActive: e.target.checked }))
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#2e7d32",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#2e7d32",
                        },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontWeight: 500 }}>
                    {form.isActive ? "Active" : "Inactive"}
                  </Typography>
                }
              />
            </DialogContent>

            <DialogActions sx={{ p: 2.5, gap: 1 }}>
              <Button
                onClick={() => setOpenDialog(false)}
                variant="outlined"
                sx={{ minWidth: 100 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={submitDoctor}
                sx={{
                  minWidth: 100,
                  backgroundColor: "#2e7d32",
                  "&:hover": {
                    backgroundColor: "#1b5e20",
                  },
                }}
              >
                {editingDoctor ? "Update Doctor" : "Add Doctor"}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
}