import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Loan } from "@src/api/loans";

const LoanDetails: React.FC<Loan> = ({
  name,
  value,
  status,
  latitude,
  longitude,
  city,
  state,
  country,
}) => {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    Number(longitude) - 0.01
  }%2C${Number(latitude) - 0.01}%2C${Number(longitude) + 0.01}%2C${
    Number(latitude) + 0.01
  }&layer=mapnik&marker=${Number(latitude)}%2C${Number(longitude)}`;

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Detalhes do Empréstimo
        </Typography>
        <Typography>
          <strong>Nome:</strong> {name}
        </Typography>
        <Typography>
          <strong>Valor:</strong> {value}
        </Typography>
        <Typography>
          <strong>Status:</strong> {status}
        </Typography>
        {city && state && country && (
          <Typography>
            <strong>Localização:</strong> {city}, {state}, {country}
          </Typography>
        )}
      </Paper>
      <Paper>
        <iframe
          width="100%"
          height="400"
          src={mapUrl}
          title="Mapa do Empréstimo"
        ></iframe>
      </Paper>
    </Box>
  );
};

export default LoanDetails;
