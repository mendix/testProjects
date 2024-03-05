// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies;

public class Person implements com.mendix.systemwideinterfaces.core.IEntityProxy
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject personMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "MyFirstModule.Person";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		FirstName("FirstName"),
		LastName("LastName"),
		PersonId("PersonId"),
		Age("Age"),
		Birthday("Birthday"),
		CustomConfig("CustomConfig");

		private final java.lang.String metaName;

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

	public Person(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, entityName));
	}

	protected Person(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject personMendixObject)
	{
		if (personMendixObject == null) {
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		}
		if (!com.mendix.core.Core.isSubClassOf(entityName, personMendixObject.getType())) {
			throw new java.lang.IllegalArgumentException(String.format("The given object is not a %s", entityName));
		}	

		this.personMendixObject = personMendixObject;
		this.context = context;
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 * @param context The context to be used
	 * @param mendixObject The Mendix object for the new instance
	 * @return a new instance of this proxy class
	 */
	public static myfirstmodule.proxies.Person initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new myfirstmodule.proxies.Person(context, mendixObject);
	}

	public static myfirstmodule.proxies.Person load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return myfirstmodule.proxies.Person.initialize(context, mendixObject);
	}

	public static java.util.List<myfirstmodule.proxies.Person> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		return com.mendix.core.Core.createXPathQuery(String.format("//%1$s%2$s", entityName, xpathConstraint))
			.execute(context)
			.stream()
			.map(obj -> myfirstmodule.proxies.Person.initialize(context, obj))
			.collect(java.util.stream.Collectors.toList());
	}

	/**
	 * @return value of FirstName
	 */
	public final java.lang.String getFirstName()
	{
		return getFirstName(getContext());
	}

	/**
	 * @param context
	 * @return value of FirstName
	 */
	public final java.lang.String getFirstName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.FirstName.toString());
	}

	/**
	 * Set value of FirstName
	 * @param firstname
	 */
	public final void setFirstName(java.lang.String firstname)
	{
		setFirstName(getContext(), firstname);
	}

	/**
	 * Set value of FirstName
	 * @param context
	 * @param firstname
	 */
	public final void setFirstName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String firstname)
	{
		getMendixObject().setValue(context, MemberNames.FirstName.toString(), firstname);
	}

	/**
	 * @return value of LastName
	 */
	public final java.lang.String getLastName()
	{
		return getLastName(getContext());
	}

	/**
	 * @param context
	 * @return value of LastName
	 */
	public final java.lang.String getLastName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.LastName.toString());
	}

	/**
	 * Set value of LastName
	 * @param lastname
	 */
	public final void setLastName(java.lang.String lastname)
	{
		setLastName(getContext(), lastname);
	}

	/**
	 * Set value of LastName
	 * @param context
	 * @param lastname
	 */
	public final void setLastName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String lastname)
	{
		getMendixObject().setValue(context, MemberNames.LastName.toString(), lastname);
	}

	/**
	 * @return value of PersonId
	 */
	public final java.lang.Long getPersonId()
	{
		return getPersonId(getContext());
	}

	/**
	 * @param context
	 * @return value of PersonId
	 */
	public final java.lang.Long getPersonId(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Long) getMendixObject().getValue(context, MemberNames.PersonId.toString());
	}

	/**
	 * Set value of PersonId
	 * @param personid
	 */
	public final void setPersonId(java.lang.Long personid)
	{
		setPersonId(getContext(), personid);
	}

	/**
	 * Set value of PersonId
	 * @param context
	 * @param personid
	 */
	public final void setPersonId(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Long personid)
	{
		getMendixObject().setValue(context, MemberNames.PersonId.toString(), personid);
	}

	/**
	 * @return value of Age
	 */
	public final java.lang.Integer getAge()
	{
		return getAge(getContext());
	}

	/**
	 * @param context
	 * @return value of Age
	 */
	public final java.lang.Integer getAge(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.Age.toString());
	}

	/**
	 * Set value of Age
	 * @param age
	 */
	public final void setAge(java.lang.Integer age)
	{
		setAge(getContext(), age);
	}

	/**
	 * Set value of Age
	 * @param context
	 * @param age
	 */
	public final void setAge(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer age)
	{
		getMendixObject().setValue(context, MemberNames.Age.toString(), age);
	}

	/**
	 * @return value of Birthday
	 */
	public final java.util.Date getBirthday()
	{
		return getBirthday(getContext());
	}

	/**
	 * @param context
	 * @return value of Birthday
	 */
	public final java.util.Date getBirthday(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.util.Date) getMendixObject().getValue(context, MemberNames.Birthday.toString());
	}

	/**
	 * Set value of Birthday
	 * @param birthday
	 */
	public final void setBirthday(java.util.Date birthday)
	{
		setBirthday(getContext(), birthday);
	}

	/**
	 * Set value of Birthday
	 * @param context
	 * @param birthday
	 */
	public final void setBirthday(com.mendix.systemwideinterfaces.core.IContext context, java.util.Date birthday)
	{
		getMendixObject().setValue(context, MemberNames.Birthday.toString(), birthday);
	}

	/**
	 * @return value of CustomConfig
	 */
	public final java.lang.String getCustomConfig()
	{
		return getCustomConfig(getContext());
	}

	/**
	 * @param context
	 * @return value of CustomConfig
	 */
	public final java.lang.String getCustomConfig(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.CustomConfig.toString());
	}

	/**
	 * Set value of CustomConfig
	 * @param customconfig
	 */
	public final void setCustomConfig(java.lang.String customconfig)
	{
		setCustomConfig(getContext(), customconfig);
	}

	/**
	 * Set value of CustomConfig
	 * @param context
	 * @param customconfig
	 */
	public final void setCustomConfig(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String customconfig)
	{
		getMendixObject().setValue(context, MemberNames.CustomConfig.toString(), customconfig);
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return personMendixObject;
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IContext getContext()
	{
		return context;
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this) {
			return true;
		}
		if (obj != null && getClass().equals(obj.getClass()))
		{
			final myfirstmodule.proxies.Person that = (myfirstmodule.proxies.Person) obj;
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
   * Gives full name ("Module.Entity" name) of the type of the entity.
   *
   * @return the name
   */
	public static java.lang.String getType()
	{
		return entityName;
	}
}
