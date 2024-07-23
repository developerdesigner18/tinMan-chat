import { io } from 'socket.io-client';

export let socket;

export const connectSocket = async (token) => {
   const options = {
      'force new connection': true,
      reconnectionAttempt: 'Infinity',
      timeout: 10000,
      transports: ['websocket'],
      query: {
         token: token,
      },
   };
   socket = io(import.meta.env.VITE_APP_SOCKET_URL, options);
};