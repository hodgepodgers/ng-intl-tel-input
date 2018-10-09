/**
 * Retrieves last created instance from global var window.intlTelInputGlobals
 * because we can't get it from the DOM anymore
 */
var findLastCreatedItiInstance = function()
{
  var keys = Object.keys(window.intlTelInputGlobals.instances);
  return window.intlTelInputGlobals.instances[keys[keys.length - 1]];
};