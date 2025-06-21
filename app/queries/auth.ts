import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await axios.post('/auth/login', data, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter pelo menos um caractere especial');

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'É necessário confirmar a senha'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      const response = await axios.post('/auth/register', data, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

export const useAuthenticatedUser = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await axios.get('/auth/me', {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post('/auth/logout', {
        withCredentials: true,
      });
      return response.data;
    },
  });
};
