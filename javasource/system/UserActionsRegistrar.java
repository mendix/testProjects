package system;

import com.mendix.core.actionmanagement.IActionRegistrator;

public class UserActionsRegistrar
{
  public void registerActions(IActionRegistrator registrator)
  {
    registrator.bundleComponentLoaded();
    registrator.registerUserAction(myfirstmodule.actions.Delay.class);
    registrator.registerUserAction(system.actions.VerifyPassword.class);
  }
}
