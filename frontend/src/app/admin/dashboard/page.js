"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
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
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function AdminDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [contactsCount, setContactsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [activities, setActivities] = useState([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
console.log("API_BASE_URL =", API_BASE_URL);

        const [bookingsRes, contactsRes, doctorsRes, activitiesRes] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/bookings/admin/all`),
            fetch(`${API_BASE_URL}/api/contacts`),
            fetch(`${API_BASE_URL}/api/doctors/admin/all`),
            fetch(`${API_BASE_URL}/api/activities`),
          ]);

        if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");
        if (!contactsRes.ok) throw new Error("Failed to fetch contacts");
        if (!doctorsRes.ok) throw new Error("Failed to fetch doctors");
        if (!activitiesRes.ok) throw new Error("Failed to fetch activities");

        const bookingsData = await bookingsRes.json();
        const contactsData = await contactsRes.json();
        const doctorsData = await doctorsRes.json();
        const activitiesData = await activitiesRes.json();

        setBookings(bookingsData.data || []);
        setContactsCount(
          Array.isArray(contactsData.data) ? contactsData.data.length : 0
        );
        setDoctorsCount(
          Array.isArray(doctorsData.data) ? doctorsData.data.length : 0
        );
        setActivities(activitiesData.data || []);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userData");
    router.push("/admin/login");
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={50} sx={{ color: "#2e7d32" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ px: 4, py: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          pb: 3,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1b5e20", mb: 0.5 }}
          >
            Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Overview of your system
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            boxShadow: 2,
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          Logout Admin
        </Button>
      </Box>

      {/* STATS CARDS */}
      <Grid container spacing={3} alignItems="stretch" sx={{ mb: 5 }}>
        {/* BOOKINGS */}
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              height: "100%",
              borderLeft: "6px solid #2e7d32",
              boxShadow: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 3,
              }}
            >
              <Typography
                color="text.secondary"
                sx={{ fontWeight: 500, mb: 1 }}
              >
                Total Bookings
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#2e7d32", my: 2 }}
              >
                {bookings.length}
              </Typography>
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Link href="/admin/bookings" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<VisibilityIcon />}
                    sx={{
                      color: "#2e7d32",
                      borderColor: "#2e7d32",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "#1b5e20",
                        backgroundColor: "rgba(46, 125, 50, 0.04)",
                      },
                    }}
                  >
                    View All
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* CONTACTS */}
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              height: "100%",
              borderLeft: "6px solid #2e7d32",
              boxShadow: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 3,
              }}
            >
              <Typography
                color="text.secondary"
                sx={{ fontWeight: 500, mb: 1 }}
              >
                Contact Submissions
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#2e7d32", my: 2 }}
              >
                {contactsCount}
              </Typography>
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Link href="/admin/contacts" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<VisibilityIcon />}
                    sx={{
                      color: "#2e7d32",
                      borderColor: "#2e7d32",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "#1b5e20",
                        backgroundColor: "rgba(46, 125, 50, 0.04)",
                      },
                    }}
                  >
                    View All
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* DOCTORS */}
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              height: "100%",
              borderLeft: "6px solid #2e7d32",
              boxShadow: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 3,
              }}
            >
              <Typography
                color="text.secondary"
                sx={{ fontWeight: 500, mb: 1 }}
              >
                👨‍⚕️ Doctors
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#2e7d32", my: 2 }}
              >
                {doctorsCount}
              </Typography>
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Link href="/admin/doctors" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<SettingsIcon />}
                    sx={{
                      color: "#2e7d32",
                      borderColor: "#2e7d32",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "#1b5e20",
                        backgroundColor: "rgba(46, 125, 50, 0.04)",
                      },
                    }}
                  >
                    Manage
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* RECENT ACTIVITIES */}
      <Box sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            pb: 2,
            borderBottom: "2px solid #e0e0e0",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1b5e20" }}>
            Recent Activities
          </Typography>
          <Chip
            label={`${activities.length} Total`}
            sx={{
              backgroundColor: "#2e7d32",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2e7d32" }}>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    py: 2,
                  }}
                >
                  Activity
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    py: 2,
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    py: 2,
                  }}
                >
                  Performed By
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    py: 2,
                  }}
                >
                  Time
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography sx={{ color: "#999", fontSize: "1rem" }}>
                      No recent activities
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                activities.map((activity, index) => (
                  <TableRow
                    key={activity._id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                      "&:hover": {
                        backgroundColor: "#e8f5e9",
                      },
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <TableCell sx={{ py: 2.5, fontWeight: 500 }}>
                      {activity.message}
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={activity.type}
                        size="small"
                        sx={{
                          backgroundColor: "#c8e6c9",
                          color: "#1b5e20",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2.5, color: "#555" }}>
                      {activity.performedBy}
                    </TableCell>
                    <TableCell
                      sx={{ py: 2.5, color: "#777", fontSize: "0.9rem" }}
                    >
                      {new Date(activity.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
