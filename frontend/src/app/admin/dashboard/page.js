"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Fade,
  Grow,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Optimized StatCard Component
const StatCard = ({ title, count, icon: Icon, link, linkText, delay }) => (
  <Grow in timeout={500 + delay * 200}>
    <Grid item xs={12} md={6} lg={4}>
      <Card
        sx={{
          borderLeft: "6px solid #2e7d32",
          boxShadow: "0 4px 12px rgba(46, 125, 50, 0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(46, 125, 50, 0.25)",
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                backgroundColor: "rgba(46, 125, 50, 0.1)",
                borderRadius: "12px",
                p: 1.5,
                mr: 2,
              }}
            >
              <Icon sx={{ color: "#2e7d32", fontSize: 32 }} />
            </Box>
            <Typography color="text.secondary" variant="body2" sx={{ flex: 1 }}>
              {title}
            </Typography>
          </Box>
          <Typography
            variant="h3"
            sx={{ color: "#2e7d32", fontWeight: 700, mb: 2 }}
          >
            {count}
          </Typography>
          <Link href={link} style={{ textDecoration: "none" }}>
            <Button
              size="small"
              endIcon={<VisibilityIcon />}
              sx={{
                color: "#2e7d32",
                "&:hover": { backgroundColor: "rgba(46, 125, 50, 0.08)" },
              }}
            >
              {linkText}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  </Grow>
);

// Optimized ContactRow Component
const ContactRow = ({ contact, onView }) => (
  <TableRow
    sx={{
      "&:hover": { backgroundColor: "rgba(46, 125, 50, 0.04)" },
      transition: "background-color 0.2s",
    }}
  >
    <TableCell sx={{ fontWeight: 600 }}>{contact.fullName || "-"}</TableCell>
    <TableCell>{contact.email}</TableCell>
    <TableCell>{contact.phone || "-"}</TableCell>
    <TableCell>
      <Chip
        label={contact.reason || "General"}
        size="small"
        sx={{
          backgroundColor: "#c8e6c9",
          color: "#1b5e20",
          fontWeight: 600,
          borderRadius: "6px",
        }}
      />
    </TableCell>
    <TableCell sx={{ maxWidth: 250 }}>
      <Typography noWrap variant="body2" color="text.secondary">
        {contact.message}
      </Typography>
    </TableCell>
    <TableCell>
      <IconButton
        color="success"
        onClick={() => onView(contact)}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(46, 125, 50, 0.1)",
            transform: "scale(1.1)",
          },
          transition: "all 0.2s",
        }}
      >
        <VisibilityIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [contactsCount, setContactsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [recentContacts, setRecentContacts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Memoized stats data
  const stats = useMemo(
    () => [
      {
        title: "Total Bookings",
        count: bookings.length,
        icon: BookmarkIcon,
        link: "/admin/bookings",
        linkText: "View All",
      },
      {
        title: "Contact Submissions",
        count: contactsCount,
        icon: ContactMailIcon,
        link: "/admin/contacts",
        linkText: "View All",
      },
      {
        title: "Registered Doctors",
        count: doctorsCount,
        icon: LocalHospitalIcon,
        link: "/admin/doctors",
        linkText: "Manage",
      },
    ],
    [bookings.length, contactsCount, doctorsCount]
  );

  // Optimized fetch function
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoints = [
        `${API_BASE_URL}/api/bookings/admin/all`,
        `${API_BASE_URL}/api/contacts`,
        `${API_BASE_URL}/api/doctors/admin/all`,
      ];

      const responses = await Promise.all(endpoints.map((url) => fetch(url)));

      responses.forEach((res, idx) => {
        if (!res.ok) {
          const labels = ["bookings", "contacts", "doctors"];
          throw new Error(`Failed to fetch ${labels[idx]}`);
        }
      });

      const [bookingsData, contactsData, doctorsData] = await Promise.all(
        responses.map((res) => res.json())
      );

      setBookings(bookingsData.data || []);

      const contactsArray = Array.isArray(contactsData.data)
        ? contactsData.data
        : [];
      setContactsCount(contactsArray.length);
      setRecentContacts(
        contactsArray
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
      );

      setDoctorsCount(
        Array.isArray(doctorsData.data) ? doctorsData.data.length : 0
      );
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    setMounted(true);
  }, [fetchStats]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userData");
    router.push("/admin/login");
  }, [router]);

  const handleViewContact = useCallback((contact) => {
    setSelectedContact(contact);
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#2e7d32", mb: 2 }} />
        <Typography color="text.secondary">Loading dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchStats}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Fade in timeout={500}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          px: { xs: 2, md: 4 },
          py: 4,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 4,
            pb: 3,
            borderBottom: "3px solid #2e7d32",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1b5e20",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SettingsIcon sx={{ fontSize: 36 }} />
              Admin Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
              Manage and monitor your healthcare system
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(211, 47, 47, 0.4)",
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* STATS CARDS */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {stats.map((stat, idx) => (
            <StatCard key={stat.title} {...stat} delay={idx} />
          ))}
        </Grid>

        {/* RECENT CONTACTS */}
        <Grow in timeout={800}>
          <Box sx={{ mt: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <ContactMailIcon sx={{ color: "#2e7d32", fontSize: 32 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#1b5e20" }}
              >
                Recent Contact Submissions
              </Typography>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderRadius: 2,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#2e7d32" }}>
                    {["Name", "Email", "Phone", "Reason", "Message", "Action"].map(
                      (header) => (
                        <TableCell
                          key={header}
                          sx={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                          }}
                        >
                          {header}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {recentContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                        <ContactMailIcon
                          sx={{ fontSize: 64, color: "#bdbdbd", mb: 2 }}
                        />
                        <Typography color="text.secondary">
                          No recent contact submissions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentContacts.map((contact) => (
                      <ContactRow
                        key={contact._id}
                        contact={contact}
                        onView={handleViewContact}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grow>

        {/* CONTACT DETAILS DIALOG */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Fade}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#2e7d32",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ContactMailIcon />
            Contact Details
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ p: 3 }}>
            {selectedContact && (
              <Box sx={{ lineHeight: 2.2 }}>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedContact.fullName || "-"}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedContact.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {selectedContact.phone || "-"}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography variant="body1" component="span">
                    <strong>Reason:</strong>
                  </Typography>
                  <Chip
                    label={selectedContact.reason || "General"}
                    size="small"
                    sx={{
                      backgroundColor: "#c8e6c9",
                      color: "#1b5e20",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    borderLeft: "4px solid #2e7d32",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                    Message:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {selectedContact.message}
                  </Typography>
                </Box>

                <Typography
                  sx={{ mt: 3, fontSize: "0.85rem", color: "#777" }}
                >
                  📅 Submitted on:{" "}
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </Typography>
              </Box>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              sx={{
                backgroundColor: "#2e7d32",
                "&:hover": { backgroundColor: "#1b5e20" },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fade>
  );
}