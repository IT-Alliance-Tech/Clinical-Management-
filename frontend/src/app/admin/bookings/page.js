"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TablePagination,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import Link from "next/link";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


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

/* ---------------- DEPARTMENTS (MATCH BACKEND) ---------------- */
const DEPARTMENTS = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dentistry",
  "Eye Care",
  "ENT",
  "Physiotherapy",
];

/* ---------------- TIME SLOTS (MATCH BOOKING FORM) ---------------- */
const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function AdminBookingsPage() {
  const [mounted, setMounted] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------- FILTERS ---------------- */
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  /* ---------------- EDIT MODAL ---------------- */
  const [openEdit, setOpenEdit] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  /* ---------------- BOOKING HISTORY ---------------- */
const [openHistory, setOpenHistory] = useState(false);
const [bookingHistory, setBookingHistory] = useState([]);
const [historyLoading, setHistoryLoading] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- FETCH BOOKINGS ---------------- */
  useEffect(() => {
    if (!mounted) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/bookings/admin/all`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setAllBookings(data.data || []);
        setFilteredBookings(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [mounted]);

  /* ---------------- APPLY FILTERS ---------------- */
  useEffect(() => {
    let data = [...allBookings];

    if (departmentFilter) {
      data = data.filter((b) => b.department === departmentFilter);
    }

    if (statusFilter) {
      data = data.filter((b) => b.status === statusFilter);
    }

    if (dateFrom) {
      data = data.filter((b) => new Date(b.date) >= new Date(dateFrom));
    }

    if (dateTo) {
      data = data.filter((b) => new Date(b.date) <= new Date(dateTo));
    }

    setFilteredBookings(data);
    setPage(0);
  }, [departmentFilter, statusFilter, dateFrom, dateTo, allBookings]);

  /* ---------------- ACTIONS ---------------- */
  const handleEdit = (booking) => {
    setEditBooking({ ...booking });
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      setAllBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

const handleViewHistory = async (booking) => {
  try {
    setHistoryLoading(true);

    const res = await fetch(
  `${API_BASE_URL}/api/bookings/admin/history?email=${booking.email}&phone=${booking.phone}&excludeId=${booking._id}`
);

    if (!res.ok) throw new Error("Failed to fetch history");

    const data = await res.json();
    setBookingHistory(data.data || []);
    setOpenHistory(true);
  } catch (err) {
    alert("Failed to load booking history");
  } finally {
    setHistoryLoading(false);
  }
};


  const handleUpdateBooking = async () => {
    if (editBooking?.status === "Rescheduled") {
      if (!editBooking.date || !editBooking.time || !editBooking.rescheduleReason?.trim()) {
        alert("Please fill in new date, time, and reschedule reason");
        return;
      }
    }

    try {
      const res = await fetch(
  `${API_BASE_URL}/api/bookings/${editBooking._id}`,
  {

          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editBooking),
        }
      );
      if (!res.ok) throw new Error("Failed to update booking");

      const updated = await res.json();
      setAllBookings((prev) =>
        prev.map((b) => (b._id === updated.data._id ? updated.data : b))
      );
      setOpenEdit(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Confirmed") return "#2e7d32";
    if (status === "Cancelled") return "#c62828";
    if (status === "Rescheduled") return "#1976d2";
    return "#ed6c02";
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={fixedLightTheme}>
      <CssBaseline />

      <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
        <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 4 } }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Link href="/admin/dashboard" style={{ textDecoration: "none" }}>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  px: 2,
                }}
              >
                ← Back to Dashboard
              </Button>
            </Link>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: "#1a1a1a",
                    mb: 0.5,
                  }}
                >
                  Bookings Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage and track all patient appointments
                </Typography>
              </Box>
              
              <Chip 
                label={`${filteredBookings.length} Total Bookings`}
                sx={{ 
                  backgroundColor: "#2e7d32",
                  color: "#fff",
                  fontWeight: 600,
                  px: 2,
                  py: 2.5,
                }}
              />
            </Box>
          </Box>

          {/* Filters Card */}
          <Card 
            sx={{ 
              mb: 3,
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <FilterListIcon sx={{ mr: 1, color: "#2e7d32" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Filter Bookings
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel shrink>Department</InputLabel>
                    <Select
                      value={departmentFilter}
                      label="Department"
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      displayEmpty
                      notched
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Departments</MenuItem>
                      {DEPARTMENTS.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel shrink>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                      displayEmpty
                      notched
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Status</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Confirmed">Confirmed</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2.5}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Date From"
                    InputLabelProps={{ shrink: true }}
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { borderRadius: 2 }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={2.5}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Date To"
                    InputLabelProps={{ shrink: true }}
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { borderRadius: 2 }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="medium"
                    onClick={() => {
                      setDepartmentFilter("");
                      setStatusFilter("");
                      setDateFrom("");
                      setDateTo("");
                    }}
                    sx={{ 
                      height: "40px",
                      borderColor: "#2e7d32",
                      color: "#2e7d32",
                      "&:hover": {
                        borderColor: "#1b5e20",
                        backgroundColor: "#f1f8f4",
                      }
                    }}
                  >
                    Reset Filters
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Table Card */}
          <Card sx={{ border: "1px solid #e0e0e0" }}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table sx={{ minWidth: 1000 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f8faf9" }}>
                      <TableCell sx={{ fontWeight: 700, py: 2 }}>Patient Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                          <Typography color="text.secondary">
                            No bookings found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBookings
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((b) => (
                          <TableRow 
                            key={b._id}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#f9fafb",
                              },
                            }}
                          >
                            <TableCell sx={{ fontWeight: 500 }}>{b.name}</TableCell>
                            <TableCell>{b.email}</TableCell>
                            <TableCell>{b.phone}</TableCell>
                            <TableCell>
                              <Chip
                                label={b.department}
                                size="small"
                                sx={{
                                  backgroundColor: "#e8f5e9",
                                  color: "#2e7d32",
                                  fontWeight: 500,
                                }}
                              />
                            </TableCell>
                            <TableCell>{b.date}</TableCell>
                            <TableCell>{b.time}</TableCell>
                            <TableCell>
                              <Chip
                                label={b.status}
                                size="small"
                                sx={{
                                  backgroundColor: getStatusColor(b.status),
                                  color: "#fff",
                                  fontWeight: 600,
                                  minWidth: 90,
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                                                             <Button
  size="small"
  onClick={() => handleViewHistory(b)}
  sx={{
    minWidth: "auto",
    p: 1,
    color: "#1976d2",
    "&:hover": {
      backgroundColor: "#e3f2fd",
    },
  }}
>
  📜
</Button>
                                <Button
                                  size="small"
                                  onClick={() => handleEdit(b)}
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
                                  onClick={() => handleDelete(b._id)}
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

              <TablePagination
                component="div"
                count={filteredBookings.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(e, p) => setPage(p)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{
                  borderTop: "1px solid #e0e0e0",
                  backgroundColor: "#fafafa",
                }}
              />
            </CardContent>
          </Card>

          <Dialog  
            open={openEdit} 
            onClose={() => setOpenEdit(false)} 
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
              }
            }}
          >
            <DialogTitle sx={{ pb: 1, fontWeight: 700, fontSize: "1.25rem" }}>
              Edit Booking Details
            </DialogTitle>
            <DialogContent dividers sx={{ py: 3 }}>
              <TextField
                fullWidth
                label="Patient Name"
                sx={{ mb: 2.5 }}
                value={editBooking?.name || ""}
                onChange={(e) =>
                  setEditBooking({ ...editBooking, name: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                sx={{ mb: 2.5 }}
                value={editBooking?.email || ""}
                onChange={(e) =>
                  setEditBooking({ ...editBooking, email: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Phone Number"
                sx={{ mb: 2.5 }}
                value={editBooking?.phone || ""}
                onChange={(e) =>
                  setEditBooking({ ...editBooking, phone: e.target.value })
                }
              />
              <FormControl fullWidth>
                <InputLabel>Booking Status</InputLabel>
                <Select
                  value={editBooking?.status || ""}
                  label="Booking Status"
                  onChange={(e) =>
                    setEditBooking({ ...editBooking, status: e.target.value })
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                </Select>
              </FormControl>

              {editBooking?.status === "Rescheduled" && (
                <>
                  <TextField
                    fullWidth
                    label="New Date"
                    type="date"
                    sx={{ mt: 2.5, mb: 2.5 }}
                    InputLabelProps={{ shrink: true }}
                    value={editBooking?.date || ""}
                    onChange={(e) =>
                      setEditBooking({ ...editBooking, date: e.target.value })
                    }
                  />
                  <FormControl fullWidth sx={{ mb: 2.5 }}>
                    <InputLabel>New Time</InputLabel>
                    <Select
                      value={editBooking?.time || ""}
                      label="New Time"
                      onChange={(e) =>
                        setEditBooking({ ...editBooking, time: e.target.value })
                      }
                    >
                      <MenuItem value="">Select Time</MenuItem>
                      {TIME_SLOTS.map((slot) => (
                        <MenuItem key={slot} value={slot}>
                          {slot}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Reschedule Reason"
                    multiline
                    rows={3}
                    placeholder="Enter reason for rescheduling..."
                    value={editBooking?.rescheduleReason || ""}
                    onChange={(e) =>
                      setEditBooking({ ...editBooking, rescheduleReason: e.target.value })
                    }
                  />
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2.5, gap: 1 }}>
              <Button 
                onClick={() => setOpenEdit(false)}
                variant="outlined"
                sx={{ minWidth: 100 }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleUpdateBooking}
                sx={{ 
                  minWidth: 100,
                  backgroundColor: "#2e7d32",
                  "&:hover": {
                    backgroundColor: "#1b5e20",
                  }
                }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
          {/* Booking History Dialog */}
<Dialog
  open={openHistory}
  onClose={() => setOpenHistory(false)}
  maxWidth="lg"
  fullWidth
>
  <DialogTitle sx={{ fontWeight: 700 }}>
    Booking History
  </DialogTitle>

  <DialogContent dividers>
    {historyLoading ? (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    ) : bookingHistory.length === 0 ? (
      <Typography color="text.secondary">
        No previous bookings found
      </Typography>
    ) : (
      <>
        {/* Summary */}
        <Typography sx={{ mb: 2, fontWeight: 600 }}>
          Total Visits: {bookingHistory.length}
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Visit #</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Time</b></TableCell>
              <TableCell><b>Department</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Booked On</b></TableCell>
              <TableCell><b>Notes</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bookingHistory.map((h, index) => (
              <TableRow key={h._id}>
                {/* Visit Number */}
                <TableCell>
                  {bookingHistory.length - index}
                </TableCell>

                <TableCell>{h.date}</TableCell>
                <TableCell>{h.time}</TableCell>
                <TableCell>{h.department}</TableCell>

                {/* Status */}
                <TableCell>
                  <Chip
                    size="small"
                    label={h.status}
                    sx={{
                      backgroundColor: getStatusColor(h.status),
                      color: "#fff",
                      fontWeight: 600,
                      minWidth: 95,
                    }}
                  />
                </TableCell>

                {/* Booked On */}
                <TableCell>
                  {h.createdAt
                    ? new Date(h.createdAt).toLocaleDateString()
                    : "—"}
                </TableCell>

                {/* Notes / Reschedule Reason */}
                <TableCell sx={{ maxWidth: 200 }}>
                  {h.status === "Rescheduled" && h.rescheduleReason ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: "pre-wrap" }}
                    >
                      {h.rescheduleReason}
                    </Typography>
                  ) : (
                    "—"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenHistory(false)}>Close</Button>
  </DialogActions>
</Dialog>


        </Container>
      </Box>
    </ThemeProvider>
  );
}