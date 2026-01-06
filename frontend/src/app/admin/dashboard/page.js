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
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [contactsCount, setContactsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [bookingsRes, contactsRes, doctorsRes] = await Promise.all([
  fetch(`${API_BASE_URL}/api/bookings/admin/all`),
  fetch(`${API_BASE_URL}/api/contacts`),
  fetch(`${API_BASE_URL}/api/doctors/admin/all`),
]);


        if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");
        if (!contactsRes.ok) throw new Error("Failed to fetch contacts");
        if (!doctorsRes.ok) throw new Error("Failed to fetch doctors");

        const bookingsData = await bookingsRes.json();
        const contactsData = await contactsRes.json();
        const doctorsData = await doctorsRes.json();

        setBookings(bookingsData.data || []);
        setContactsCount(
          Array.isArray(contactsData.data) ? contactsData.data.length : 0
        );
        setDoctorsCount(
          Array.isArray(doctorsData.data) ? doctorsData.data.length : 0
        );
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
    <Container
      maxWidth={false}
      disableGutters
      sx={{ px: 4, py: 4, backgroundColor: "#f9f9f9" }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1b5e20" }}>
          Admin Dashboard
        </Typography>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          Logout
        </Button>
      </Box>

      {/* STATS */}
      <Grid
        container
        spacing={3}
        alignItems="stretch"   // ✅ makes all items same height
      >
        {/* BOOKINGS */}
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              height: "100%",      // ✅ full height
              borderLeft: "6px solid #2e7d32",
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography color="text.secondary">
                Total Bookings
              </Typography>

              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#2e7d32", my: 2 }}
              >
                {bookings.length}
              </Typography>

              <Box sx={{ mt: "auto" }}>
                <Link href="/admin/bookings">
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "#2e7d32",
                      fontWeight: 600,
                    }}
                  >
                    View All →
                  </Typography>
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
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography color="text.secondary">
                Contact Submissions
              </Typography>

              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#2e7d32", my: 2 }}
              >
                {contactsCount}
              </Typography>

              <Box sx={{ mt: "auto" }}>
                <Link href="/admin/contacts">
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "#2e7d32",
                      fontWeight: 600,
                    }}
                  >
                    View All →
                  </Typography>
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
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography color="text.secondary">
                👨‍⚕️ Doctors
              </Typography>

              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#2e7d32", my: 2 }}
              >
                {doctorsCount}
              </Typography>

              <Box sx={{ mt: "auto" }}>
                <Link href="/admin/doctors">
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "#2e7d32",
                      fontWeight: 600,
                    }}
                  >
                    Manage →
                  </Typography>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
