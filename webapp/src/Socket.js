// put in its own file so that the socket can be accessed from other files as a Singleton
import openSocket from 'socket.io-client';
// connection to server	
export const socket = openSocket('https://localhost:8000');