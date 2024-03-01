// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package testsuite.proxies;

public class Image extends system.proxies.Image
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "TestSuite.Image";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Caption("Caption"),
		Description("Description"),
		URL("URL"),
		PublicThumbnailPath("PublicThumbnailPath"),
		EnableCaching("EnableCaching"),
		FileID("FileID"),
		Name("Name"),
		DeleteAfterDownload("DeleteAfterDownload"),
		Contents("Contents"),
		HasContents("HasContents"),
		Size("Size"),
		Image_Carousel("TestSuite.Image_Carousel");

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

	public Image(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, entityName));
	}

	protected Image(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject imageMendixObject)
	{
		super(context, imageMendixObject);
		if (!com.mendix.core.Core.isSubClassOf(entityName, imageMendixObject.getType())) {
			throw new java.lang.IllegalArgumentException(String.format("The given object is not a %s", entityName));
		}	
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 * @param context The context to be used
	 * @param mendixObject The Mendix object for the new instance
	 * @return a new instance of this proxy class
	 */
	public static testsuite.proxies.Image initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new testsuite.proxies.Image(context, mendixObject);
	}

	public static testsuite.proxies.Image load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return testsuite.proxies.Image.initialize(context, mendixObject);
	}

	public static java.util.List<testsuite.proxies.Image> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		return com.mendix.core.Core.createXPathQuery(String.format("//%1$s%2$s", entityName, xpathConstraint))
			.execute(context)
			.stream()
			.map(obj -> testsuite.proxies.Image.initialize(context, obj))
			.collect(java.util.stream.Collectors.toList());
	}

	/**
	 * @return value of Caption
	 */
	public final java.lang.String getCaption()
	{
		return getCaption(getContext());
	}

	/**
	 * @param context
	 * @return value of Caption
	 */
	public final java.lang.String getCaption(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Caption.toString());
	}

	/**
	 * Set value of Caption
	 * @param caption
	 */
	public final void setCaption(java.lang.String caption)
	{
		setCaption(getContext(), caption);
	}

	/**
	 * Set value of Caption
	 * @param context
	 * @param caption
	 */
	public final void setCaption(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String caption)
	{
		getMendixObject().setValue(context, MemberNames.Caption.toString(), caption);
	}

	/**
	 * @return value of Description
	 */
	public final java.lang.String getDescription()
	{
		return getDescription(getContext());
	}

	/**
	 * @param context
	 * @return value of Description
	 */
	public final java.lang.String getDescription(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Description.toString());
	}

	/**
	 * Set value of Description
	 * @param description
	 */
	public final void setDescription(java.lang.String description)
	{
		setDescription(getContext(), description);
	}

	/**
	 * Set value of Description
	 * @param context
	 * @param description
	 */
	public final void setDescription(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String description)
	{
		getMendixObject().setValue(context, MemberNames.Description.toString(), description);
	}

	/**
	 * @return value of URL
	 */
	public final java.lang.String getURL()
	{
		return getURL(getContext());
	}

	/**
	 * @param context
	 * @return value of URL
	 */
	public final java.lang.String getURL(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.URL.toString());
	}

	/**
	 * Set value of URL
	 * @param url
	 */
	public final void setURL(java.lang.String url)
	{
		setURL(getContext(), url);
	}

	/**
	 * Set value of URL
	 * @param context
	 * @param url
	 */
	public final void setURL(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String url)
	{
		getMendixObject().setValue(context, MemberNames.URL.toString(), url);
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of Image_Carousel
	 */
	public final testsuite.proxies.Carousel getImage_Carousel() throws com.mendix.core.CoreException
	{
		return getImage_Carousel(getContext());
	}

	/**
	 * @param context
	 * @return value of Image_Carousel
	 * @throws com.mendix.core.CoreException
	 */
	public final testsuite.proxies.Carousel getImage_Carousel(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		testsuite.proxies.Carousel result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.Image_Carousel.toString());
		if (identifier != null) {
			result = testsuite.proxies.Carousel.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of Image_Carousel
	 * @param image_carousel
	 */
	public final void setImage_Carousel(testsuite.proxies.Carousel image_carousel)
	{
		setImage_Carousel(getContext(), image_carousel);
	}

	/**
	 * Set value of Image_Carousel
	 * @param context
	 * @param image_carousel
	 */
	public final void setImage_Carousel(com.mendix.systemwideinterfaces.core.IContext context, testsuite.proxies.Carousel image_carousel)
	{
		if (image_carousel == null) {
			getMendixObject().setValue(context, MemberNames.Image_Carousel.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.Image_Carousel.toString(), image_carousel.getMendixObject().getId());
		}
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this) {
			return true;
		}
		if (obj != null && getClass().equals(obj.getClass()))
		{
			final testsuite.proxies.Image that = (testsuite.proxies.Image) obj;
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
