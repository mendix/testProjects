// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package testsuite.actions;

import java.io.File;
import java.io.FileInputStream;
import com.mendix.core.Core;
import com.mendix.systemwideinterfaces.core.IMendixObject;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.webui.CustomJavaAction;

public class setPictures2 extends CustomJavaAction<java.lang.Boolean>
{
	private final java.lang.String pictureName;
	/** @deprecated use pictureObject.getMendixObject() instead. */
	@java.lang.Deprecated(forRemoval = true)
	private final IMendixObject __pictureObject;
	private final system.proxies.Image pictureObject;

	public setPictures2(
		IContext context,
		java.lang.String _pictureName,
		IMendixObject _pictureObject
	)
	{
		super(context);
		this.pictureName = _pictureName;
		this.__pictureObject = _pictureObject;
		this.pictureObject = _pictureObject == null ? null : system.proxies.Image.initialize(getContext(), _pictureObject);
	}

	@java.lang.Override
	public java.lang.Boolean executeAction() throws Exception
	{
		// BEGIN USER CODE
		File image = new File(Core.getConfiguration().getResourcesPath(), pictureName);
		pictureObject.setName(pictureName);
		if(image.exists())
			Core.storeImageDocumentContent(this.getContext(), pictureObject.getMendixObject(), new FileInputStream(image), 200, 250);
		else
			Core.getLogger("JavaAction").warn("Could not find image: " + pictureName);
		return true;
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 * @return a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "setPictures2";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
