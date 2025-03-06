import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export interface Loan {
  id: number | string;
  name: string;
  value: number;
  latitude: number | null;
  longitude: number | null;

  status?: "APPROVED" | "REJECTED" | "PENDING";

  city?: string;
  state?: string;
  country?: string;
}

export const getLoans = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}/loans`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  const total = parseInt(response.headers["x-total-count"] || "0", 10);
  return { loans: response.data, total };
};

export const getLoanById = async (id: number | string): Promise<Loan> => {
   const response = await axios.get(`${API_URL}/loans/${id}`);
  return response.data;
};

export const createLoan = async (data: Partial<Loan>): Promise<Loan> => {
  const response = await axios.post(`${API_URL}/loans`, data);
  return response.data;
};
