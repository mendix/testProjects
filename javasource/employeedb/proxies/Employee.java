// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package employeedb.proxies;

public class Employee implements com.mendix.systemwideinterfaces.core.IEntityProxy
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject employeeMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "EmployeeDB.Employee";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		_id("_id"),
		birth_date("birth_date"),
		birth_day("birth_day"),
		birth_month("birth_month"),
		birth_year("birth_year"),
		children("children"),
		favorite_color("favorite_color"),
		first_name("first_name"),
		have_pets("have_pets"),
		last_name("last_name"),
		Employee_Company("EmployeeDB.Employee_Company"),
		Employee_Role("EmployeeDB.Employee_Role");

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

	public Employee(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, entityName));
	}

	protected Employee(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject employeeMendixObject)
	{
		if (employeeMendixObject == null) {
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		}
		if (!com.mendix.core.Core.isSubClassOf(entityName, employeeMendixObject.getType())) {
			throw new java.lang.IllegalArgumentException(String.format("The given object is not a %s", entityName));
		}	

		this.employeeMendixObject = employeeMendixObject;
		this.context = context;
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 * @param context The context to be used
	 * @param mendixObject The Mendix object for the new instance
	 * @return a new instance of this proxy class
	 */
	public static employeedb.proxies.Employee initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new employeedb.proxies.Employee(context, mendixObject);
	}

	public static employeedb.proxies.Employee load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return employeedb.proxies.Employee.initialize(context, mendixObject);
	}

	public static java.util.List<employeedb.proxies.Employee> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		return com.mendix.core.Core.createXPathQuery(String.format("//%1$s%2$s", entityName, xpathConstraint))
			.execute(context)
			.stream()
			.map(obj -> employeedb.proxies.Employee.initialize(context, obj))
			.collect(java.util.stream.Collectors.toList());
	}

	/**
	 * @return value of _id
	 */
	public final java.lang.Integer get_id()
	{
		return get_id(getContext());
	}

	/**
	 * @param context
	 * @return value of _id
	 */
	public final java.lang.Integer get_id(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames._id.toString());
	}

	/**
	 * Set value of _id
	 * @param _id
	 */
	public final void set_id(java.lang.Integer _id)
	{
		set_id(getContext(), _id);
	}

	/**
	 * Set value of _id
	 * @param context
	 * @param _id
	 */
	public final void set_id(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer _id)
	{
		getMendixObject().setValue(context, MemberNames._id.toString(), _id);
	}

	/**
	 * @return value of birth_date
	 */
	public final java.util.Date getbirth_date()
	{
		return getbirth_date(getContext());
	}

	/**
	 * @param context
	 * @return value of birth_date
	 */
	public final java.util.Date getbirth_date(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.util.Date) getMendixObject().getValue(context, MemberNames.birth_date.toString());
	}

	/**
	 * Set value of birth_date
	 * @param birth_date
	 */
	public final void setbirth_date(java.util.Date birth_date)
	{
		setbirth_date(getContext(), birth_date);
	}

	/**
	 * Set value of birth_date
	 * @param context
	 * @param birth_date
	 */
	public final void setbirth_date(com.mendix.systemwideinterfaces.core.IContext context, java.util.Date birth_date)
	{
		getMendixObject().setValue(context, MemberNames.birth_date.toString(), birth_date);
	}

	/**
	 * @return value of birth_day
	 */
	public final java.lang.Integer getbirth_day()
	{
		return getbirth_day(getContext());
	}

	/**
	 * @param context
	 * @return value of birth_day
	 */
	public final java.lang.Integer getbirth_day(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.birth_day.toString());
	}

	/**
	 * Set value of birth_day
	 * @param birth_day
	 */
	public final void setbirth_day(java.lang.Integer birth_day)
	{
		setbirth_day(getContext(), birth_day);
	}

	/**
	 * Set value of birth_day
	 * @param context
	 * @param birth_day
	 */
	public final void setbirth_day(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer birth_day)
	{
		getMendixObject().setValue(context, MemberNames.birth_day.toString(), birth_day);
	}

	/**
	 * @return value of birth_month
	 */
	public final java.lang.Integer getbirth_month()
	{
		return getbirth_month(getContext());
	}

	/**
	 * @param context
	 * @return value of birth_month
	 */
	public final java.lang.Integer getbirth_month(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.birth_month.toString());
	}

	/**
	 * Set value of birth_month
	 * @param birth_month
	 */
	public final void setbirth_month(java.lang.Integer birth_month)
	{
		setbirth_month(getContext(), birth_month);
	}

	/**
	 * Set value of birth_month
	 * @param context
	 * @param birth_month
	 */
	public final void setbirth_month(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer birth_month)
	{
		getMendixObject().setValue(context, MemberNames.birth_month.toString(), birth_month);
	}

	/**
	 * @return value of birth_year
	 */
	public final java.lang.Integer getbirth_year()
	{
		return getbirth_year(getContext());
	}

	/**
	 * @param context
	 * @return value of birth_year
	 */
	public final java.lang.Integer getbirth_year(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.birth_year.toString());
	}

	/**
	 * Set value of birth_year
	 * @param birth_year
	 */
	public final void setbirth_year(java.lang.Integer birth_year)
	{
		setbirth_year(getContext(), birth_year);
	}

	/**
	 * Set value of birth_year
	 * @param context
	 * @param birth_year
	 */
	public final void setbirth_year(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer birth_year)
	{
		getMendixObject().setValue(context, MemberNames.birth_year.toString(), birth_year);
	}

	/**
	 * @return value of children
	 */
	public final java.lang.Integer getchildren()
	{
		return getchildren(getContext());
	}

	/**
	 * @param context
	 * @return value of children
	 */
	public final java.lang.Integer getchildren(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.children.toString());
	}

	/**
	 * Set value of children
	 * @param children
	 */
	public final void setchildren(java.lang.Integer children)
	{
		setchildren(getContext(), children);
	}

	/**
	 * Set value of children
	 * @param context
	 * @param children
	 */
	public final void setchildren(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer children)
	{
		getMendixObject().setValue(context, MemberNames.children.toString(), children);
	}

	/**
	 * Get value of favorite_color
	 * @param favorite_color
	 */
	public final employeedb.proxies.Color getfavorite_color()
	{
		return getfavorite_color(getContext());
	}

	/**
	 * @param context
	 * @return value of favorite_color
	 */
	public final employeedb.proxies.Color getfavorite_color(com.mendix.systemwideinterfaces.core.IContext context)
	{
		Object obj = getMendixObject().getValue(context, MemberNames.favorite_color.toString());
		if (obj == null) {
			return null;
		}
		return employeedb.proxies.Color.valueOf((java.lang.String) obj);
	}

	/**
	 * Set value of favorite_color
	 * @param favorite_color
	 */
	public final void setfavorite_color(employeedb.proxies.Color favorite_color)
	{
		setfavorite_color(getContext(), favorite_color);
	}

	/**
	 * Set value of favorite_color
	 * @param context
	 * @param favorite_color
	 */
	public final void setfavorite_color(com.mendix.systemwideinterfaces.core.IContext context, employeedb.proxies.Color favorite_color)
	{
		if (favorite_color != null) {
			getMendixObject().setValue(context, MemberNames.favorite_color.toString(), favorite_color.toString());
		} else {
			getMendixObject().setValue(context, MemberNames.favorite_color.toString(), null);
		}
	}

	/**
	 * @return value of first_name
	 */
	public final java.lang.String getfirst_name()
	{
		return getfirst_name(getContext());
	}

	/**
	 * @param context
	 * @return value of first_name
	 */
	public final java.lang.String getfirst_name(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.first_name.toString());
	}

	/**
	 * Set value of first_name
	 * @param first_name
	 */
	public final void setfirst_name(java.lang.String first_name)
	{
		setfirst_name(getContext(), first_name);
	}

	/**
	 * Set value of first_name
	 * @param context
	 * @param first_name
	 */
	public final void setfirst_name(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String first_name)
	{
		getMendixObject().setValue(context, MemberNames.first_name.toString(), first_name);
	}

	/**
	 * @return value of have_pets
	 */
	public final java.lang.Boolean gethave_pets()
	{
		return gethave_pets(getContext());
	}

	/**
	 * @param context
	 * @return value of have_pets
	 */
	public final java.lang.Boolean gethave_pets(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.have_pets.toString());
	}

	/**
	 * Set value of have_pets
	 * @param have_pets
	 */
	public final void sethave_pets(java.lang.Boolean have_pets)
	{
		sethave_pets(getContext(), have_pets);
	}

	/**
	 * Set value of have_pets
	 * @param context
	 * @param have_pets
	 */
	public final void sethave_pets(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean have_pets)
	{
		getMendixObject().setValue(context, MemberNames.have_pets.toString(), have_pets);
	}

	/**
	 * @return value of last_name
	 */
	public final java.lang.String getlast_name()
	{
		return getlast_name(getContext());
	}

	/**
	 * @param context
	 * @return value of last_name
	 */
	public final java.lang.String getlast_name(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.last_name.toString());
	}

	/**
	 * Set value of last_name
	 * @param last_name
	 */
	public final void setlast_name(java.lang.String last_name)
	{
		setlast_name(getContext(), last_name);
	}

	/**
	 * Set value of last_name
	 * @param context
	 * @param last_name
	 */
	public final void setlast_name(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String last_name)
	{
		getMendixObject().setValue(context, MemberNames.last_name.toString(), last_name);
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of Employee_Company
	 */
	public final employeedb.proxies.Company getEmployee_Company() throws com.mendix.core.CoreException
	{
		return getEmployee_Company(getContext());
	}

	/**
	 * @param context
	 * @return value of Employee_Company
	 * @throws com.mendix.core.CoreException
	 */
	public final employeedb.proxies.Company getEmployee_Company(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		employeedb.proxies.Company result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Employee_Company.toString());
		if (identifier != null) {
			result = employeedb.proxies.Company.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of Employee_Company
	 * @param employee_company
	 */
	public final void setEmployee_Company(employeedb.proxies.Company employee_company)
	{
		setEmployee_Company(getContext(), employee_company);
	}

	/**
	 * Set value of Employee_Company
	 * @param context
	 * @param employee_company
	 */
	public final void setEmployee_Company(com.mendix.systemwideinterfaces.core.IContext context, employeedb.proxies.Company employee_company)
	{
		if (employee_company == null) {
			getMendixObject().setValue(context, MemberNames.Employee_Company.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.Employee_Company.toString(), employee_company.getMendixObject().getId());
		}
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of Employee_Role
	 */
	public final java.util.List<employeedb.proxies.Role> getEmployee_Role() throws com.mendix.core.CoreException
	{
		return getEmployee_Role(getContext());
	}

	/**
	 * @param context
	 * @return value of Employee_Role
	 * @throws com.mendix.core.CoreException
	 */
	@SuppressWarnings("unchecked")
	public final java.util.List<employeedb.proxies.Role> getEmployee_Role(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		java.util.List<employeedb.proxies.Role> result = new java.util.ArrayList<>();
		Object valueObject = getMendixObject().getValue(context, MemberNames.Employee_Role.toString());
		if (valueObject == null) {
			return result;
		}
		for (com.mendix.systemwideinterfaces.core.IMendixObject mendixObject : com.mendix.core.Core.retrieveIdList(context, (java.util.List<com.mendix.systemwideinterfaces.core.IMendixIdentifier>) valueObject)) {
			result.add(employeedb.proxies.Role.initialize(context, mendixObject));
		}
		return result;
	}

	/**
	 * Set value of Employee_Role
	 * @param employee_role
	 */
	public final void setEmployee_Role(java.util.List<employeedb.proxies.Role> employee_role)
	{
		setEmployee_Role(getContext(), employee_role);
	}

	/**
	 * Set value of Employee_Role
	 * @param context
	 * @param employee_role
	 */
	public final void setEmployee_Role(com.mendix.systemwideinterfaces.core.IContext context, java.util.List<employeedb.proxies.Role> employee_role)
	{
		var identifiers = employee_role
			.stream()
			.map(proxyObject -> proxyObject.getMendixObject().getId())
			.collect(java.util.stream.Collectors.toList());
		
		getMendixObject().setValue(context, MemberNames.Employee_Role.toString(), identifiers);
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return employeeMendixObject;
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
			final employeedb.proxies.Employee that = (employeedb.proxies.Employee) obj;
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
