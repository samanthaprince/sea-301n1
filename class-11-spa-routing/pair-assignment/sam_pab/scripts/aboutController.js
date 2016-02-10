(function(module) {
  var aboutController = {};
  console.log('outhere');
  aboutController.index = function() {
    console.log('test');
    $('#articles').hide();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window);
