let button = document.querySelector('#connect');

connect.addEventListener('pointerup', function(event) {
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
