const io = require('socket.io-client')

const socket = io('http://localhost:4000/manager', {
  query: {token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsInJvbGUiOiJhZG1pbiIsInByb2R1Y3RMaXN0IjpbImN1ZHktMy4wIiwiY3VkeS1sbXMiLCJkYXNoYm9hcmQtdXNlcnMiXSwiaWF0IjoxNjAxNTc5MjE4fQ.YBsiJNkiz0oJv3VacITBcEtSUGSMSr1wqc16wtjtLG8'}
});

console.log(socket.connected); // false

socket.on('connect', () => {
  console.log("Connected",socket.connected); // true
});

socket.on('authenticated', data => {
  console.log("Test",data);
})


//setTimeout(()=>socket.disconnect(),6000);

// socket.on('unauthorized', msz=> {
//   console.log("You are not allowed");
// })

// socket.on('chat2',data=>{
//     console.log(data);
// });

socket.on('disconnect', () => {
  console.log("Discounted", socket.connected); // false
});