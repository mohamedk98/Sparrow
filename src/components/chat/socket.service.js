import { io } from 'socket.io-client';
export const socket = io('https://zombie-hat.herokuapp.com', {
  autoConnect: false,
});
