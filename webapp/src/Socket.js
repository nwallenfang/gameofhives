// put in its own file so that the socket can be accessed from other files as a Singleton
import openSocket from 'socket.io-client';
// connection to server	

// determine hostname 
let address;
if (window.location.hostname === 'localhost') { // development
    address = 'http://' + window.location.hostname + ':8080';
} else { // production
    address = 'https://' + window.location.hostname;
}
export const socket = openSocket(address);