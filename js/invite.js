var OC_Invite = {
 csrfToken: $('head').data('requesttoken'),
   /**
   * Sends the given user object to the server
   * for serverside validation and updates the
   * UI accordingly
   *
   * @param user: The user to validate
   */
   validateServerside: function(user) {
    $.ajax({
      url: 'users/test',
      data: user,
      type: 'post',
      data: JSON.stringify(user),
      contentType: "application/json",
      headers: {
        Accept: "application/json",
        requesttoken: OC_Invite.csrfToken
      },
      success: function(validationResult){
        var user = validationResult.user;
        if(user.validUserName) {
          $('em#user-invalid').hide();
          $('em#user-valid').show();
        } else {
          $('em#user-invalid').show().text(validationResult.msg);
          $('em#user-valid').hide();
        }

        if(user.validEmail) {
          $('em#email-invalid').hide();
          $('em#email-valid').show();
        } else {
          $('em#email-invalid').show().text(validationResult.msg);
          $('em#email-valid').hide();
        }
      }
    })
  },
  /**
   * Creates a user from the input form
   */
   createUserFromForm: function() {
    return {
      user: {
        username: $('input#username').val(),
        email: $('input#email').val()
      }
    }
  },

  /**
   * Handles keypresses on the input elements
   */
   keyEventHandler: function(evt){
    var search = this.value;
    if (search.length >= 3) {
      OC_Invite.validateServerside(OC_Invite.createUserFromForm())
    }
  }

}



// Listen for form updates
$(document).ready(function(){
  $('input#username').on('focusout', OC_Invite.keyEventHandler);
  $('input#email').on('focusout', OC_Invite.keyEventHandler);
});