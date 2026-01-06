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
      <div style={{ padding: '32px', display: 'flex', justifyContent: 'center', marginTop: '128px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #ccc', borderTop: '4px solid #1b5e20', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ px: 4, py: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Box sx={{ mb: 2 }}>
        <Link href="/admin/dashboard" legacyBehavior>
          <Button variant="outlined" size="small">← Back</Button>
        </Link>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1b5e20', mb: 1 }}>
          Contact Submissions
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Total Submissions: {contacts.length}
        </Typography>
      </Box>

      <Card sx={{ backgroundColor: '#ffffff' }}>
        <CardContent>
          {contacts.length === 0 ? (
            <Alert severity="info">
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                No Contacts Found
              </Typography>
              <Typography variant="body2">
                There are currently no contact submissions to display.
              </Typography>
            </Alert>
          ) : (
            <>
              <TableContainer component={Paper} elevation={0}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#1b5e20' }}>
                        Full Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1b5e20' }}>
                        Email
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1b5e20' }}>
                        Phone
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1b5e20' }}>
                        Reason
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1b5e20' }}>
                        Message
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1b5e20' }}>
                        Submitted
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1b5e20' }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedContacts.map((contact) => (
                      <TableRow
                        key={contact._id}
                        sx={{
                          '&:hover': { backgroundColor: '#f5f5f5' },
                          '&:nth-of-type(even)': { backgroundColor: '#fafafa' },
                        }}
                      >
                        <TableCell>{contact.fullName || '-'}</TableCell>
                        <TableCell>{contact.email || '-'}</TableCell>
                        <TableCell>{contact.phone || '-'}</TableCell>
                        <TableCell>{contact.reason || '-'}</TableCell>
                        <TableCell
                          sx={{
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={contact.message}
                        >
                          {contact.message || '-'}
                        </TableCell>
                        <TableCell>{formatDate(contact.createdAt)}</TableCell>
                        <TableCell>
                          <Chip
                            label={contact.status || 'new'}
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

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={contacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
