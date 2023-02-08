// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies;

public class Values_NP
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject values_NPMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "MyFirstModule.Values_NP";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		xValue("xValue"),
		yValue("yValue"),
		xValueEnum("xValueEnum"),
		bubbleSize("bubbleSize"),
		seriesName("seriesName"),
		seriesColor("seriesColor");

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

	public Values_NP(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "MyFirstModule.Values_NP"));
	}

	protected Values_NP(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject values_NPMendixObject)
	{
		if (values_NPMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("MyFirstModule.Values_NP", values_NPMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a MyFirstModule.Values_NP");

		this.values_NPMendixObject = values_NPMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'Values_NP.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static myfirstmodule.proxies.Values_NP initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return myfirstmodule.proxies.Values_NP.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static myfirstmodule.proxies.Values_NP initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new myfirstmodule.proxies.Values_NP(context, mendixObject);
	}

	public static myfirstmodule.proxies.Values_NP load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return myfirstmodule.proxies.Values_NP.initialize(context, mendixObject);
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
	public final java.lang.String getxValue()
	{
		return getxValue(getContext());
	}

	/**
	 * @param context
	 * @return value of xValue
	 */
	public final java.lang.String getxValue(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.xValue.toString());
	}

	/**
	 * Set value of xValue
	 * @param xvalue
	 */
	public final void setxValue(java.lang.String xvalue)
	{
		setxValue(getContext(), xvalue);
	}

	/**
	 * Set value of xValue
	 * @param context
	 * @param xvalue
	 */
	public final void setxValue(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xvalue)
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
	 * Set value of xValueEnum
	 * @param xvalueenum
	 */
	public final myfirstmodule.proxies.Months getxValueEnum()
	{
		return getxValueEnum(getContext());
	}

	/**
	 * @param context
	 * @return value of xValueEnum
	 */
	public final myfirstmodule.proxies.Months getxValueEnum(com.mendix.systemwideinterfaces.core.IContext context)
	{
		Object obj = getMendixObject().getValue(context, MemberNames.xValueEnum.toString());
		if (obj == null)
			return null;

		return myfirstmodule.proxies.Months.valueOf((java.lang.String) obj);
	}

	/**
	 * Set value of xValueEnum
	 * @param xvalueenum
	 */
	public final void setxValueEnum(myfirstmodule.proxies.Months xvalueenum)
	{
		setxValueEnum(getContext(), xvalueenum);
	}

	/**
	 * Set value of xValueEnum
	 * @param context
	 * @param xvalueenum
	 */
	public final void setxValueEnum(com.mendix.systemwideinterfaces.core.IContext context, myfirstmodule.proxies.Months xvalueenum)
	{
		if (xvalueenum != null)
			getMendixObject().setValue(context, MemberNames.xValueEnum.toString(), xvalueenum.toString());
		else
			getMendixObject().setValue(context, MemberNames.xValueEnum.toString(), null);
	}

	/**
	 * @return value of bubbleSize
	 */
	public final java.lang.Integer getbubbleSize()
	{
		return getbubbleSize(getContext());
	}

	/**
	 * @param context
	 * @return value of bubbleSize
	 */
	public final java.lang.Integer getbubbleSize(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.bubbleSize.toString());
	}

	/**
	 * Set value of bubbleSize
	 * @param bubblesize
	 */
	public final void setbubbleSize(java.lang.Integer bubblesize)
	{
		setbubbleSize(getContext(), bubblesize);
	}

	/**
	 * Set value of bubbleSize
	 * @param context
	 * @param bubblesize
	 */
	public final void setbubbleSize(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer bubblesize)
	{
		getMendixObject().setValue(context, MemberNames.bubbleSize.toString(), bubblesize);
	}

	/**
	 * @return value of seriesName
	 */
	public final java.lang.String getseriesName()
	{
		return getseriesName(getContext());
	}

	/**
	 * @param context
	 * @return value of seriesName
	 */
	public final java.lang.String getseriesName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.seriesName.toString());
	}

	/**
	 * Set value of seriesName
	 * @param seriesname
	 */
	public final void setseriesName(java.lang.String seriesname)
	{
		setseriesName(getContext(), seriesname);
	}

	/**
	 * Set value of seriesName
	 * @param context
	 * @param seriesname
	 */
	public final void setseriesName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String seriesname)
	{
		getMendixObject().setValue(context, MemberNames.seriesName.toString(), seriesname);
	}

	/**
	 * @return value of seriesColor
	 */
	public final java.lang.String getseriesColor()
	{
		return getseriesColor(getContext());
	}

	/**
	 * @param context
	 * @return value of seriesColor
	 */
	public final java.lang.String getseriesColor(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.seriesColor.toString());
	}

	/**
	 * Set value of seriesColor
	 * @param seriescolor
	 */
	public final void setseriesColor(java.lang.String seriescolor)
	{
		setseriesColor(getContext(), seriescolor);
	}

	/**
	 * Set value of seriesColor
	 * @param context
	 * @param seriescolor
	 */
	public final void setseriesColor(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String seriescolor)
	{
		getMendixObject().setValue(context, MemberNames.seriesColor.toString(), seriescolor);
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return values_NPMendixObject;
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
			final myfirstmodule.proxies.Values_NP that = (myfirstmodule.proxies.Values_NP) obj;
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
		return "MyFirstModule.Values_NP";
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
