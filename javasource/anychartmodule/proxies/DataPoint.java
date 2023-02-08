// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package anychartmodule.proxies;

public class DataPoint
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject dataPointMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "AnyChartModule.DataPoint";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		xValue("xValue"),
		yValue("yValue");

		private java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@java.lang.Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public DataPoint(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "AnyChartModule.DataPoint"));
	}

	protected DataPoint(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject dataPointMendixObject)
	{
		if (dataPointMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("AnyChartModule.DataPoint", dataPointMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a AnyChartModule.DataPoint");

		this.dataPointMendixObject = dataPointMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'DataPoint.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static anychartmodule.proxies.DataPoint initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return anychartmodule.proxies.DataPoint.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static anychartmodule.proxies.DataPoint initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new anychartmodule.proxies.DataPoint(context, mendixObject);
	}

	public static anychartmodule.proxies.DataPoint load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return anychartmodule.proxies.DataPoint.initialize(context, mendixObject);
	}

	public static java.util.List<anychartmodule.proxies.DataPoint> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<anychartmodule.proxies.DataPoint> result = new java.util.ArrayList<anychartmodule.proxies.DataPoint>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//AnyChartModule.DataPoint" + xpathConstraint))
			result.add(anychartmodule.proxies.DataPoint.initialize(context, obj));
		return result;
	}

	/**
	 * Commit the changes made on this proxy object.
	 */
	public final void commit() throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Commit the changes made on this proxy object using the specified context.
	 */
	public final void commit(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Delete the object.
	 */
	public final void delete()
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}

	/**
	 * Delete the object using the specified context.
	 */
	public final void delete(com.mendix.systemwideinterfaces.core.IContext context)
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}
	/**
	 * @return value of xValue
	 */
	public final java.lang.Integer getxValue()
	{
		return getxValue(getContext());
	}

	/**
	 * @param context
	 * @return value of xValue
	 */
	public final java.lang.Integer getxValue(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.xValue.toString());
	}

	/**
	 * Set value of xValue
	 * @param xvalue
	 */
	public final void setxValue(java.lang.Integer xvalue)
	{
		setxValue(getContext(), xvalue);
	}

	/**
	 * Set value of xValue
	 * @param context
	 * @param xvalue
	 */
	public final void setxValue(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer xvalue)
	{
		getMendixObject().setValue(context, MemberNames.xValue.toString(), xvalue);
	}

	/**
	 * @return value of yValue
	 */
	public final java.lang.Integer getyValue()
	{
		return getyValue(getContext());
	}

	/**
	 * @param context
	 * @return value of yValue
	 */
	public final java.lang.Integer getyValue(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.yValue.toString());
	}

	/**
	 * Set value of yValue
	 * @param yvalue
	 */
	public final void setyValue(java.lang.Integer yvalue)
	{
		setyValue(getContext(), yvalue);
	}

	/**
	 * Set value of yValue
	 * @param context
	 * @param yvalue
	 */
	public final void setyValue(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer yvalue)
	{
		getMendixObject().setValue(context, MemberNames.yValue.toString(), yvalue);
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return dataPointMendixObject;
	}

	/**
	 * @return the IContext instance of this proxy, or null if no IContext instance was specified at initialization.
	 */
	public final com.mendix.systemwideinterfaces.core.IContext getContext()
	{
		return context;
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final anychartmodule.proxies.DataPoint that = (anychartmodule.proxies.DataPoint) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@java.lang.Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static java.lang.String getType()
	{
		return "AnyChartModule.DataPoint";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@java.lang.Deprecated
	public java.lang.String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}
