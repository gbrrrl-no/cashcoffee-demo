import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      // TODO: criar interceptor para tratar erros no futuro
      try {
        const response = await axios.post('/auth/login', data, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              return Promise.reject(new Error('Email ou senha inválidos.'));
            } else if (error.response.status === 404) {
              return Promise.reject(new Error('Recurso não encontrado.'));
            } else if (error.response.status >= 500) {
              return Promise.reject(
                new Error('Erro interno do servidor. Tente novamente mais tarde.'),
              );
            } else {
              return Promise.reject(
                new Error(error.response.data?.message || `Erro: ${error.response.status}`),
              );
            }
          } else if (error.request) {
            return Promise.reject(
              new Error('Não foi possível conectar ao servidor. Verifique sua conexão.'),
            );
          }
        }

        return Promise.reject(new Error('Ocorreu um erro desconhecido.'));
      }
    },
  });
};

const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Senha deve conter pelo menos um desses caracteres especiais: !@#$%^&*(),.?":{}|<>',
  );

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'É necessário confirmar a senha'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['password'],
  });

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      try {
        const response = await axios.post('/auth/register', data, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              return Promise.reject(new Error('Recurso não encontrado.'));
            } else if (error.response.status >= 500) {
              return Promise.reject(
                new Error('Erro interno do servidor. Tente novamente mais tarde.'),
              );
            } else {
              return Promise.reject(
                new Error(error.response.data?.message || `Erro: ${error.response.status}`),
              );
            }
          } else if (error.request) {
            return Promise.reject(
              new Error('Não foi possível conectar ao servidor. Verifique sua conexão.'),
            );
          }
        }

        return Promise.reject(new Error('Ocorreu um erro desconhecido.'));
      }
    },
  });
};

export const useAuthenticateUser = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.get('/auth/me', {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              return Promise.reject(new Error('Sessão expirada. Faça login novamente.'));
            } else if (error.response.status === 404) {
              return Promise.reject(new Error('Recurso não encontrado.'));
            } else if (error.response.status >= 500) {
              return Promise.reject(
                new Error('Erro interno do servidor. Tente novamente mais tarde.'),
              );
            } else {
              return Promise.reject(
                new Error(error.response.data?.message || `Erro: ${error.response.status}`),
              );
            }
          } else if (error.request) {
            return Promise.reject(
              new Error('Não foi possível conectar ao servidor. Verifique sua conexão.'),
            );
          }
        }

        return Promise.reject(new Error('Ocorreu um erro desconhecido.'));
      }
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post('/auth/logout', {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              return Promise.reject(new Error('Recurso não encontrado.'));
            } else if (error.response.status >= 500) {
              return Promise.reject(
                new Error('Erro interno do servidor. Tente novamente mais tarde.'),
              );
            } else {
              return Promise.reject(
                new Error(error.response.data?.message || `Erro: ${error.response.status}`),
              );
            }
          } else if (error.request) {
            return Promise.reject(
              new Error('Não foi possível conectar ao servidor. Verifique sua conexão.'),
            );
          }
        }

        return Promise.reject(new Error('Ocorreu um erro desconhecido.'));
      }
    },
  });
};
