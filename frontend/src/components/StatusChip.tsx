import React from "react";
import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

interface StatusChipProps {
  status: "APPROVED" | "REJECTED" | "PENDING" | string;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  let icon: React.ReactElement | undefined;
  let color:
    | "default"
    | "error"
    | "info"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  let label: string;

  switch (status.toUpperCase()) {
    case "APPROVED":
      icon = <CheckCircleIcon />;
      color = "success";
      label = "Aprovado";
      break;
    case "REJECTED":
      icon = <CancelIcon />;
      color = "error";
      label = "Rejeitado";
      break;
    case "PENDING":
      icon = <HourglassEmptyIcon />;
      color = "warning";
      label = "Pendente";
      break;
    default:
      icon = <HourglassEmptyIcon />;
      color = "warning";
      label = "Pendente";
  }

  return <Chip icon={icon} label={label} color={color} variant="outlined" />;
};

export default StatusChip;
