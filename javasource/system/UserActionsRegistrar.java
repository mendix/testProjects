package system;

import com.mendix.core.actionmanagement.IActionRegistrator;

public class UserActionsRegistrar
{
  public void registerActions(IActionRegistrator registrator)
  {
    registrator.registerUserAction(feedbackmodule.actions.ValidateEmail.class);
    registrator.registerUserAction(feedbackmodule.actions.XSS_Sanitizer.class);
    registrator.registerUserAction(system.actions.VerifyPassword.class);
  }
}
