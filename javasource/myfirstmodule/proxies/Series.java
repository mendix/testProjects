// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies;

public class Series
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject seriesMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "MyFirstModule.Series";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		serieName("serieName"),
		EnumName("EnumName"),
		Series_Values("MyFirstModule.Series_Values");

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

	public Series(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "MyFirstModule.Series"));
	}

	protected Series(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject seriesMendixObject)
	{
		if (seriesMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("MyFirstModule.Series", seriesMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a MyFirstModule.Series");

		this.seriesMendixObject = seriesMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'Series.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static myfirstmodule.proxies.Series initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return myfirstmodule.proxies.Series.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static myfirstmodule.proxies.Series initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new myfirstmodule.proxies.Series(context, mendixObject);
	}

	public static myfirstmodule.proxies.Series load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return myfirstmodule.proxies.Series.initialize(context, mendixObject);
	}

	public static java.util.List<myfirstmodule.proxies.Series> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<myfirstmodule.proxies.Series> result = new java.util.ArrayList<myfirstmodule.proxies.Series>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//MyFirstModule.Series" + xpathConstraint))
			result.add(myfirstmodule.proxies.Series.initialize(context, obj));
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
	 * @return value of serieName
	 */
	public final java.lang.String getserieName()
	{
		return getserieName(getContext());
	}

	/**
	 * @param context
	 * @return value of serieName
	 */
	public final java.lang.String getserieName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.serieName.toString());
	}

	/**
	 * Set value of serieName
	 * @param seriename
	 */
	public final void setserieName(java.lang.String seriename)
	{
		setserieName(getContext(), seriename);
	}

	/**
	 * Set value of serieName
	 * @param context
	 * @param seriename
	 */
	public final void setserieName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String seriename)
	{
		getMendixObject().setValue(context, MemberNames.serieName.toString(), seriename);
	}

	/**
	 * Set value of EnumName
	 * @param enumname
	 */
	public final myfirstmodule.proxies.DynamicSeries_Names getEnumName()
	{
		return getEnumName(getContext());
	}

	/**
	 * @param context
	 * @return value of EnumName
	 */
	public final myfirstmodule.proxies.DynamicSeries_Names getEnumName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		Object obj = getMendixObject().getValue(context, MemberNames.EnumName.toString());
		if (obj == null)
			return null;

		return myfirstmodule.proxies.DynamicSeries_Names.valueOf((java.lang.String) obj);
	}

	/**
	 * Set value of EnumName
	 * @param enumname
	 */
	public final void setEnumName(myfirstmodule.proxies.DynamicSeries_Names enumname)
	{
		setEnumName(getContext(), enumname);
	}

	/**
	 * Set value of EnumName
	 * @param context
	 * @param enumname
	 */
	public final void setEnumName(com.mendix.systemwideinterfaces.core.IContext context, myfirstmodule.proxies.DynamicSeries_Names enumname)
	{
		if (enumname != null)
			getMendixObject().setValue(context, MemberNames.EnumName.toString(), enumname.toString());
		else
			getMendixObject().setValue(context, MemberNames.EnumName.toString(), null);
	}

	/**
	 * @return value of Series_Values
	 */
	public final java.util.List<myfirstmodule.proxies.Values> getSeries_Values() throws com.mendix.core.CoreException
	{
		return getSeries_Values(getContext());
	}

	/**
	 * @param context
	 * @return value of Series_Values
	 */
	@SuppressWarnings("unchecked")
	public final java.util.List<myfirstmodule.proxies.Values> getSeries_Values(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		java.util.List<myfirstmodule.proxies.Values> result = new java.util.ArrayList<myfirstmodule.proxies.Values>();
		Object valueObject = getMendixObject().getValue(context, MemberNames.Series_Values.toString());
		if (valueObject == null)
			return result;
		for (com.mendix.systemwideinterfaces.core.IMendixObject mendixObject : com.mendix.core.Core.retrieveIdList(context, (java.util.List<com.mendix.systemwideinterfaces.core.IMendixIdentifier>) valueObject))
			result.add(myfirstmodule.proxies.Values.initialize(context, mendixObject));
		return result;
	}

	/**
	 * Set value of Series_Values
	 * @param series_values
	 */
	public final void setSeries_Values(java.util.List<myfirstmodule.proxies.Values> series_values)
	{
		setSeries_Values(getContext(), series_values);
	}

	/**
	 * Set value of Series_Values
	 * @param context
	 * @param series_values
	 */
	public final void setSeries_Values(com.mendix.systemwideinterfaces.core.IContext context, java.util.List<myfirstmodule.proxies.Values> series_values)
	{
		java.util.List<com.mendix.systemwideinterfaces.core.IMendixIdentifier> identifiers = new java.util.ArrayList<com.mendix.systemwideinterfaces.core.IMendixIdentifier>();
		for (myfirstmodule.proxies.Values proxyObject : series_values)
			identifiers.add(proxyObject.getMendixObject().getId());
		getMendixObject().setValue(context, MemberNames.Series_Values.toString(), identifiers);
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return seriesMendixObject;
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
			final myfirstmodule.proxies.Series that = (myfirstmodule.proxies.Series) obj;
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
		return "MyFirstModule.Series";
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
