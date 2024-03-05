let button = document.querySelector('#connect');
let sendForm = document.getElementById('send-form');
let inputField = document.getElementById('input');

button.addEventListener('pointerup', function(event) {
  // Call navigator.bluetooth.requestDevice

  navigator.bluetooth.requestDevice({
  acceptAllDevices: true,
  optionalServices: ['battery_service'] // Required to access service later.
})
.then(device => { /* … */ })
.catch(error => { console.error(error); });

  navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => {
  // Human-readable name of the device.
  console.log(device.name);

  // Attempts to connect to remote GATT Server.
  return device.gatt.connect();
})
.then(server => { /* … */ })
.catch(error => { console.error(error); });
});
//aboba
const send = (data) => {
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
};

sendForm.addEventListener('submit', (event) => {
  event.preventDefault();

  send(inputField.value);

  inputField.value = '';
  inputField.focus();
});

function setOpacity() {
  var el = document.getElementsByClassName("sendForm")[0];
  var el = document.getElementsByClassName("inputField")[0];
  var op = 0;
  
