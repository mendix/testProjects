package system;

import com.mendix.core.actionmanagement.IActionRegistrator;

public class UserActionsRegistrar
{
  public void registerActions(IActionRegistrator registrator)
  {
    registrator.bundleComponentLoaded();
    registrator.registerUserAction(imagecrop.actions.CopyFileContent.class);
    registrator.registerUserAction(imagecrop.actions.CreateBWImage.class);
    registrator.registerUserAction(imagecrop.actions.CropImage.class);
    registrator.registerUserAction(imagecrop.actions.ScaleImage.class);
    registrator.registerUserAction(imagecrop.actions.SetInitialImageProps.class);
    registrator.registerUserAction(system.actions.VerifyPassword.class);
  }
}
