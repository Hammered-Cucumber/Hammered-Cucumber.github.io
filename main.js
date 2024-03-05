let button = document.querySelector('#connect');
let sendForm = document.getElementById('send-form');
const terminalContainer = document.getElementById('input');

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

const send = (data) => {
  terminal.send(data).
      then(() => input(data, 'out')).
      catch((error) => input(error));
};
  

