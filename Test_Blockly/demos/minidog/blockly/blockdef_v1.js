Blockly.Blocks['execute_motion'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(toggleLang("Normal Motion"))
        .appendField(new Blockly.FieldDropdown([["forward","forward"], ["backward","backward"], ["turn left","turnleft"], ["turn right","turnright"]]), "motion_cmd");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("MiniDog Motion");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['execute_test'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(toggleLang("Normal Motion"))
        .appendField(new Blockly.FieldDropdown([["cmd_F","F"], ["cmd_B","B"]]), "test_cmd");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("MiniDog Motion");
 this.setHelpUrl("");
  }
};

