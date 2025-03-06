"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { createLoan, Loan } from "@src/api/loans";

const LoanForm: React.FC = () => {
  const [formData, setFormData] = useState<Loan>({
    name: "",
    value: 0,
    latitude: null,
    longitude: null,
  });
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertMessage, setAlertMessage] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      setAlertSeverity("error");
      setAlertMessage("Geolocalização não suportada pelo seu navegador.");
      setAlertOpen(true);
      return;
    }
    setLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setLoadingGeo(false);
      },
      (error) => {
        setAlertSeverity("error");
        setAlertMessage("Erro ao capturar a geolocalização.");
        setAlertOpen(true);
        setLoadingGeo(false);
      }
    );
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se a geolocalização foi capturada
    if (formData.latitude === null || formData.longitude === null) {
      setAlertSeverity("error");
      setAlertMessage("A geolocalização é obrigatória.");
      setAlertOpen(true);
      return;
    }

    try {
      const newLoan = await createLoan(formData);
      setAlertSeverity("success");
      setAlertMessage("Solicitação enviada com sucesso!");
      setAlertOpen(true);
      // Aguarda 3 segundos e redireciona para a home
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setAlertSeverity("error");
      setAlertMessage("Erro ao enviar a solicitação.");
      setAlertOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Solicitação de Empréstimo
      </Typography>
      <TextField
        fullWidth
        label="Nome do Cliente"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Valor do Empréstimo"
        name="value"
        type="number"
        value={formData.value}
        onChange={handleChange}
        margin="normal"
        required
      />
      <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
        <Button
          variant="outlined"
          onClick={getGeolocation}
          disabled={loadingGeo}
        >
          {loadingGeo ? "Capturando..." : "Capturar Geolocalização"}
        </Button>
        {formData.latitude && formData.longitude && (
          <Typography sx={{ ml: 2 }}>
            Lat: {formData.latitude.toFixed(4)}, Lon:{" "}
            {formData.longitude.toFixed(4)}
          </Typography>
        )}
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Solicitar Empréstimo
      </Button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoanForm;
