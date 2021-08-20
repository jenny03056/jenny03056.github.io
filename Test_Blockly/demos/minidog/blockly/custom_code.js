
/*
  Some functions for control robog. 
*/
  
 var send_wait_time = [200, 600, 700, 800, 900, 1000] ;

  function send_cmd(sendcmd, callback) { 
  
  	  let encoder = new TextEncoder('utf-8');
      let sendMsg = encoder.encode(sendcmd);
      myCharacteristic.writeValue(sendMsg)
      .then(_ => {
        log('Send data ' + sendMsg);
      })
      .catch(error => { 
        log(error); 
      });      
       window.setTimeout( function() {
       callback() ;
       }, send_wait_time[0] ) ; // longer time for its execute
   //   break ;
  }


/*
	Need to register new function for acorn_interpreter) ;
*/
var registerBlocklyWithSendAsyncFunction = function(interpreter, scope) {

	var wrapper = interpreter.createAsyncFunction(
    function( key, callback) {

		if ( key == "forward") {
		    send_cmd("F#", callback);
		}
		else if ( key == "backward") {
		    send_cmd("B,", callback);
		}
		else if ( key == "turnleft") {
		    send_cmd("L,", callback);
		}
		else if ( key == "turnright") {
		    send_cmd("R,", callback);
		}
		else {
            console.log("Error Code !! ") ;
		}
    });
	interpreter.setProperty(scope, 'SEND_COMMAND', wrapper);
}

    var _serv_uuid = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E'.toLowerCase();
    var _char_uuid = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'.toLowerCase();  // 3 - microbit 

    var bluetoothDevice = null;
    var connected = false;
    var myCharacteristic;
    var value = {};

  function log(v)
  {
    var line = Array.prototype.slice.call(arguments).map(function(argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');

    document.querySelector('#log').textContent += line + '\n';
    console.log(line);
  }

  function _connect() {
    document.querySelector('#log').textContent = '';
    log('Requesting any Bluetooth Device...');
    navigator.bluetooth.requestDevice({
       filters: [{
  		   namePrefix: 'ESP'
        }],
    //    acceptAllDevices: true,
        optionalServices: [_serv_uuid]
        })
    .then(device => {
      log('Connecting to GATT Server...');
      bluetoothDevice = device;
      bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
      return device.gatt.connect();
    })
    .then(server => {
      log('Getting Service...');
      return server.getPrimaryService(_serv_uuid);
    })
    .then(service => {
      log('Getting Characteristic...');
      return service.getCharacteristic(_char_uuid);
    })
    .then(characteristic => {
  //    log('Reading Characteristic values...');
      myCharacteristic = characteristic;
      return 1;
    })
    .then(value => {
      connected = true;
      _update();
    })
    .catch(error => {
      if (bluetoothDevice && bluetoothDevice.gatt.connected) {
        bluetoothDevice.gatt.disconnect();
      }
      bluetoothDevice = null;
      connected = false;
//	  state_data =0;
      log("Error:", error); 
      _update();
    });
  }

  function onDisconnected(event) {
      log("Disconnected by remote device!"); 
      bluetoothDevice = null;
      connected = false;
      _update();    
  }

  function _disconnect() {
    log("_disconnect");
    if (!connected) {
      return;
    }
    log('Disconnecting from Bluetooth Device...');
    if (bluetoothDevice.gatt.connected) {
      bluetoothDevice.gatt.disconnect();
    } else {
      log('> Bluetooth Device is already disconnected');
    }
    _update();
  }

  function _update()
  {
    if(!navigator.bluetooth) {
   //   document.querySelector('#hint').innerText = "Hint: Web Bluetooth API is not available on current browser";
      document.querySelector('#connect').classList.add("disabled");

      return;
    }

    if(connected)
    {
      document.querySelector('#connect').onclick = _disconnect;
      document.querySelector('#connect').innerText = "斷開裝置";
 //     document.querySelector('#connect').classList.remove("btn-primary");
    }
    else
    {
      document.querySelector('#connect').onclick = _connect;
      document.querySelector('#connect').innerText = "連接裝置";
      document.querySelector('#connect').classList.add("btn-primary");
    }
  }

  function _load() {
    _update();
  }
   
