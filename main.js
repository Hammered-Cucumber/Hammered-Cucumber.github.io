button.addEventListener('pointerup', function(event) {
  // Call navigator.bluetooth.requestDevice
});

// Запустить выбор Bluetooth устройства и подключиться к выбранному
function connect() {
  return (deviceCache ? Promise.resolve(deviceCache) :
      requestBluetoothDevice()).
      then(device => connectDeviceAndCacheCharacteristic(device)).
      then(characteristic => startNotifications(characteristic)).
      catch(error => log(error));
}

// Запрос выбора Bluetooth устройства
function requestBluetoothDevice() {
  //
}

// Подключение к определенному устройству, получение сервиса и характеристики
function connectDeviceAndCacheCharacteristic(device) {
  //
}

// Включение получения уведомлений об изменении характеристики
function startNotifications(characteristic) {
  //
}

// Вывод в терминал
function log(data, type = '') {
  //
}


// Запрос выбора Bluetooth устройства
function requestBluetoothDevice() {
    log('Requesting bluetooth device...');
  
    return navigator.bluetooth.requestDevice({
      filters: [{services: [0xFFE0]}],
    }).
        then(device => {
          log('"' + device.name + '" bluetooth device selected');
          deviceCache = device;
  
          return deviceCache;
        });
  }
// Запрос выбора Bluetooth устройства
function requestBluetoothDevice() {
    log('Requesting bluetooth device...');
  
    return navigator.bluetooth.requestDevice({
      filters: [{services: [0xFFE0]}],
    }).
        then(device => {
          log('"' + device.name + '" bluetooth device selected');
          deviceCache = device;
  
          return deviceCache;
        });
  }

// Включение получения уведомлений об изменении характеристики
function startNotifications(characteristic) {
    log('Starting notifications...');
  
    return characteristic.startNotifications().
        then(() => {
          log('Notifications started');
        });
  }

  // Вывод в терминал
function log(data, type = '') {
    terminalContainer.insertAdjacentHTML('beforeend',
        '<div' + (type ? ' class="' + type + '"' : '') + '>' + data + '</div>');
  }

  // Запрос выбора Bluetooth устройства
function requestBluetoothDevice() {
    log('Requesting bluetooth device...');
  
    return navigator.bluetooth.requestDevice({
      filters: [{services: [0xFFE0]}],
    }).
        then(device => {
          log('"' + device.name + '" bluetooth device selected');
          deviceCache = device;
  
          // Добавленная строка
          deviceCache.addEventListener('gattserverdisconnected',
              handleDisconnection);
  
          return deviceCache;
        });
  }
  
  // Обработчик разъединения
  function handleDisconnection(event) {
    let device = event.target;
  
    log('"' + device.name +
        '" bluetooth device disconnected, trying to reconnect...');
  
    connectDeviceAndCacheCharacteristic(device).
        then(characteristic => startNotifications(characteristic)).
        catch(error => log(error));
  }

  // Отключиться от подключенного устройства
function disconnect() {
    if (deviceCache) {
      log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
      deviceCache.removeEventListener('gattserverdisconnected',
          handleDisconnection);
  
      if (deviceCache.gatt.connected) {
        deviceCache.gatt.disconnect();
        log('"' + deviceCache.name + '" bluetooth device disconnected');
      }
      else {
        log('"' + deviceCache.name +
            '" bluetooth device is already disconnected');
      }
    }
  
    characteristicCache = null;
    deviceCache = null;
  }

  // Включение получения уведомлений об изменении характеристики
function startNotifications(characteristic) {
    log('Starting notifications...');
  
    return characteristic.startNotifications().
        then(() => {
          log('Notifications started');
          // Добавленная строка
          characteristic.addEventListener('characteristicvaluechanged',
              handleCharacteristicValueChanged);
        });
  }
  
  // Отключиться от подключенного устройства
  function disconnect() {
    if (deviceCache) {
      log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
      deviceCache.removeEventListener('gattserverdisconnected',
          handleDisconnection);
  
      if (deviceCache.gatt.connected) {
        deviceCache.gatt.disconnect();
        log('"' + deviceCache.name + '" bluetooth device disconnected');
      }
      else {
        log('"' + deviceCache.name +
            '" bluetooth device is already disconnected');
      }
    }
  
    // Добавленное условие
    if (characteristicCache) {
      characteristicCache.removeEventListener('characteristicvaluechanged',
          handleCharacteristicValueChanged);
      characteristicCache = null;
    }
  
    deviceCache = null;
  }
  
  // Получение данных
  function handleCharacteristicValueChanged(event) {
    let value = new TextDecoder().decode(event.target.value);
    log(value, 'in');
  }

  // Промежуточный буфер для входящих данных
let readBuffer = '';

// Получение данных
function handleCharacteristicValueChanged(event) {
  let value = new TextDecoder().decode(event.target.value);

  for (let c of value) {
    if (c === '\n') {
      let data = readBuffer.trim();
      readBuffer = '';

      if (data) {
        receive(data);
      }
    }
    else {
      readBuffer += c;
    }
  }
}

// Обработка полученных данных
function receive(data) {
  log(data, 'in');
}

// Отправить данные подключенному устройству
function send(data) {
    data = String(data);
  
    if (!data || !characteristicCache) {
      return;
    }
  
    writeToCharacteristic(characteristicCache, data);
    log(data, 'out');
  }
  
  // Записать значение в характеристику
  function writeToCharacteristic(characteristic, data) {
    characteristic.writeValue(new TextEncoder().encode(data));
  }

  // Отправить данные подключенному устройству
function send(data) {
    data = String(data);
  
    if (!data || !characteristicCache) {
      return;
    }
  
    data += '\n';
  
    if (data.length > 20) {
      let chunks = data.match(/(.|[\r\n]){1,20}/g);
  
      writeToCharacteristic(characteristicCache, chunks[0]);
  
      for (let i = 1; i < chunks.length; i++) {
        setTimeout(() => {
          writeToCharacteristic(characteristicCache, chunks[i]);
        }, i * 100);
      }
    }
    else {
      writeToCharacteristic(characteristicCache, data);
    }
  
    log(data, 'out');
  }

  

// Подключение к устройству при нажатии на кнопку Connect
connectButton.addEventListener('click', function() {
  connect();
});

// Отключение от устройства при нажатии на кнопку Disconnect
disconnectButton.addEventListener('click', function() {
  disconnect();
});

// Обработка события отправки формы
sendForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвратить отправку формы
  send(inputField.value); // Отправить содержимое текстового поля
  inputField.value = '';  // Обнулить текстовое поле
  inputField.focus();     // Вернуть фокус на текстовое поле
});

// Запустить выбор Bluetooth устройства и подключиться к выбранному
function connect() {
  //
}

// Отключиться от подключенного устройства
function disconnect() {
  //
}

// Отправить данные подключенному устройству
function send(data) {
  //
}
