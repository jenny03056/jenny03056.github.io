Blockly.JavaScript['execute_motion'] = function(block) { 
  var dropdown_motion = block.getFieldValue('motion_cmd');
  var code = 'SEND_COMMAND( "' + dropdown_motion + '" ) ; \n';
  return code;
};

Blockly.JavaScript['execute_test'] = function(block) { 
  var m_cmd = block.getFieldValue('test_cmd');
  console.log(" Test = " + m_cmd) ;
  var code = 'SEND_COMMAND( "' + m_cmd + '" ) ; \n';
  return code;
};



// Need to debug 
Blockly.JavaScript['wait_ms'] = function(block) { 
  var seconds = Number(block.getFieldValue('MS'));
  var code = 'waitForMS(' + MS + ');\n';
  return code;
};

/**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */
Blockly.JavaScript['wait_seconds'] = function(block) {
  var seconds = Number(block.getFieldValue('SECONDS'));
  var code = 'waitForSeconds(' + seconds + ');\n';
  return code;
};

/**
 * Register the interpreter asynchronous function
 * <code>waitForSeconds()</code>.
 */
function initInterpreterWaitForSeconds(interpreter, scope) {
	  // Ensure function name does not conflict with variable names.
	  Blockly.JavaScript.addReservedWords('waitForSeconds');

	  var wrapper = interpreter.createAsyncFunction(
		function(timeInSeconds, callback) {
		  // Delay the call to the callback.
		  console.log("in waitForSeconds loop wait=" + timeInSeconds) ;
		  setTimeout(callback, timeInSeconds * 1000);
		});
	  interpreter.setProperty(scope, 'waitForSeconds', wrapper);
  
	  
	  // for waitForMS( 200 );
	  Blockly.JavaScript.addReservedWords('waitForMS');
	  var wrapper = interpreter.createAsyncFunction(
		function(timeInSeconds, callback) {
		  // Delay the call to the callback.
		  console.log("in waitForMS loop wait=" + timeInSeconds) ;
		  setTimeout(callback, timeInSeconds );
		});
	  interpreter.setProperty(scope, 'waitForMS', wrapper);
	  
  
	Blockly.JavaScript.addReservedWords('controlServo');
	var wrapper = interpreter.createAsyncFunction(
	function(arg1, arg2 , callback) {
		// Delay the call to the callback.
		console.log("controlServo = " + arg1 + "," + arg2 ) ;
		controlServo( arg1, arg2) ;
		setTimeout(callback, 1 ); // callback rightaway 
	});
	interpreter.setProperty(scope, 'controlServo', wrapper);
  
  
}

