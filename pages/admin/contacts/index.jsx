import React, { useEffect, useState } from "react";
import ContactCard from "@/components/contact/ContactCard";
import { Button, Grid, Typography } from "@mui/material";
import { Launch } from "@mui/icons-material";
import Link from "next/link";
import { fetchData } from "@/lib/handlers/fetchData";

const AdminContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData("contacts", setIsLoading, setData, "singleDocument");
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h3' mb={3}>
          Informations actuelles
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6} mb={3}>
        <Typography color='' variant='h4' mb={3}>
          Version française
        </Typography>
        <ContactCard data={data} loading={isLoading} />
      </Grid>
        <Grid item xs={12} lg={6} mb={3}>
            <Typography color='' variant='h4' mb={3}>
                Version française
            </Typography>
            <ContactCard data={data} loading={isLoading} />
        </Grid>
      <Grid item xs={12} lg={6} mb={3}>
        <Typography color='' variant='h4' mb={3}>
          Version anglaise
        </Typography>
        <ContactCard english data={data} loading={isLoading} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h3' mt={5}>
          Modifications
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link href='/admin/contacts/edit'>
          <Button variant='contained' startIcon={<Launch />} sx={{ mt: 2 }}>{`Modifier les informations de contact`}</Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default AdminContact;
