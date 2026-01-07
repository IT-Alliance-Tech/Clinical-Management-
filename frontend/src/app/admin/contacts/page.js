'use client';

import { useEffect, useState } from 'react';
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
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminContactsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchContacts = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/contacts`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });

        if (response.status >= 400) {
          throw new Error('Failed to fetch contacts');
        }

        const data = await response.json();
        setContacts(data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [isMounted]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedContacts = contacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString || '-';
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: '#ff9800',
      read: '#2196f3',
      responded: '#4caf50',
    };
    return colors[status?.toLowerCase()] || '#9e9e9e';
  };

  if (!isMounted) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={50} sx={{ color: '#2e7d32' }} />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={50} sx={{ color: '#2e7d32' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ px: 4, py: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}
    >
      {/* BACK BUTTON */}
      <Box sx={{ mb: 3 }}>
        <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
          <Button 
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#2e7d32',
              borderColor: '#2e7d32',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#1b5e20',
                backgroundColor: 'rgba(46, 125, 50, 0.04)',
              }
            }}
          >
            Back to Dashboard
          </Button>
        </Link>
      </Box>

      {/* HEADER */}
      <Box 
        sx={{ 
          mb: 4,
          pb: 3,
          borderBottom: '2px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1b5e20', mb: 0.5 }}>
            Contact Submissions
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Manage and view all contact form submissions
          </Typography>
        </Box>
        <Chip 
          label={`${contacts.length} Total Contacts`}
          sx={{ 
            backgroundColor: '#2e7d32',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.95rem',
            px: 1,
            py: 2.5
          }}
        />
      </Box>

      {/* CONTACTS TABLE CARD */}
      <Card 
        sx={{ 
          backgroundColor: '#ffffff',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {contacts.length === 0 ? (
            <Box sx={{ p: 4 }}>
              <Alert 
                severity="info"
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    color: '#2e7d32'
                  }
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  No Contacts Found
                </Typography>
                <Typography variant="body2">
                  There are currently no contact submissions to display.
                </Typography>
              </Alert>
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          backgroundColor: '#2e7d32',
                          color: '#fff',
                          fontSize: '0.95rem',
                          py: 2
                        }}
                      >
                        Full Name
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          backgroundColor: '#2e7d32',
                          color: '#fff',
                          fontSize: '0.95rem',
                          py: 2
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          backgroundColor: '#2e7d32',
                          color: '#fff',
                          fontSize: '0.95rem',
                          py: 2
                        }}
                      >
                        Phone
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          backgroundColor: '#2e7d32',
                          color: '#fff',
                          fontSize: '0.95rem',
                          py: 2
                        }}
                      >
                        Reason
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          backgroundColor: '#2e7d32',
                          color: '#fff',
                          fontSize: '0.95rem',
                          py: 2
                        }}
                      >
                        Message
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          backgroundColor: '#2e7d32',
                          color: '#fff',
                          fontSize: '0.95rem',
                          py: 2
                        }}
                      >
                        Submitted
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 700, 
                          backgroundColor: '#2e7d32',
                          color: '#fff',
                          fontSize: '0.95rem',
                          py: 2
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedContacts.map((contact, index) => (
                      <TableRow
                        key={contact._id}
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                          '&:hover': { 
                            backgroundColor: '#e8f5e9',
                          },
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <TableCell sx={{ py: 2.5, fontWeight: 500 }}>
                          {contact.fullName || '-'}
                        </TableCell>
                        <TableCell sx={{ py: 2.5, color: '#555' }}>
                          {contact.email || '-'}
                        </TableCell>
                        <TableCell sx={{ py: 2.5, color: '#555' }}>
                          {contact.phone || '-'}
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Chip 
                            label={contact.reason || '-'}
                            size="small"
                            sx={{
                              backgroundColor: '#c8e6c9',
                              color: '#1b5e20',
                              fontWeight: 600
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            py: 2.5,
                            maxWidth: '250px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: '#555'
                          }}
                          title={contact.message}
                        >
                          {contact.message || '-'}
                        </TableCell>
                        <TableCell sx={{ py: 2.5, color: '#777', fontSize: '0.9rem' }}>
                          {formatDate(contact.createdAt)}
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Chip
                            label={contact.status || 'new'}
                            size="small"
                            sx={{
                              backgroundColor: getStatusColor(contact.status),
                              color: '#fff',
                              textTransform: 'capitalize',
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ borderTop: '1px solid #e0e0e0' }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={contacts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                      fontWeight: 500,
                      color: '#555'
                    }
                  }}
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}