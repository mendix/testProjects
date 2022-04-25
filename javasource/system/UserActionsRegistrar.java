package system;

import com.mendix.core.actionmanagement.IActionRegistrator;

public class UserActionsRegistrar
{
  public void registerActions(IActionRegistrator registrator)
  {
    registrator.bundleComponentLoaded();
    registrator.registerUserAction(system.actions.VerifyPassword.class);
    registrator.registerUserAction(testsuite.actions.Delay.class);
    registrator.registerUserAction(testsuite.actions.setPictures2.class);
  }
}
