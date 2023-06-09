// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies.microflows;

import java.util.HashMap;
import java.util.Map;
import com.mendix.core.Core;
import com.mendix.systemwideinterfaces.core.IContext;

public class Microflows
{
	/**
	 * @deprecated
	 * The default constructor of the Microflows class should not be used.
	 * Use the static microflow invocation methods instead.
	 */
	@java.lang.Deprecated(since = "9.12", forRemoval = true)
	public Microflows() {}

	// These are the microflows for the MyFirstModule module
	public static void mF_Change_Parameter(IContext context, myfirstmodule.proxies.Person _person, myfirstmodule.proxies.Filter _filter)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		params.put("Person", _person == null ? null : _person.getMendixObject());
		params.put("Filter", _filter == null ? null : _filter.getMendixObject());
		Core.microflowCall("MyFirstModule.MF_Change_Parameter").withParams(params).execute(context);
	}
	public static boolean startupMF_CreatePerson(IContext context)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		return (java.lang.Boolean) Core.microflowCall("MyFirstModule.StartupMF_CreatePerson").withParams(params).execute(context);
	}
	public static boolean startupMF_Main(IContext context)
	{
		Map<java.lang.String, Object> params = new HashMap<>();
		return (java.lang.Boolean) Core.microflowCall("MyFirstModule.StartupMF_Main").withParams(params).execute(context);
	}
}
