// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package system.proxies;

public class WorkflowActivityRecord implements com.mendix.systemwideinterfaces.core.IEntityProxy
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject workflowActivityRecordMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "System.WorkflowActivityRecord";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		ModelGUID("ModelGUID"),
		ActivityKey("ActivityKey"),
		PreviousActivityKey("PreviousActivityKey"),
		ActivityType("ActivityType"),
		Caption("Caption"),
		State("State"),
		StartTime("StartTime"),
		EndTime("EndTime"),
		Outcome("Outcome"),
		MicroflowName("MicroflowName"),
		TaskName("TaskName"),
		TaskDescription("TaskDescription"),
		TaskDueDate("TaskDueDate"),
		TaskCompletionType("TaskCompletionType"),
		TaskRequiredUsers("TaskRequiredUsers"),
		Reason("Reason"),
		WorkflowActivityRecord_PreviousActivity("System.WorkflowActivityRecord_PreviousActivity"),
		WorkflowActivityRecord_Actor("System.WorkflowActivityRecord_Actor"),
		WorkflowActivityRecord_SubWorkflow("System.WorkflowActivityRecord_SubWorkflow"),
		WorkflowActivityRecord_UserTask("System.WorkflowActivityRecord_UserTask"),
		WorkflowActivityRecord_WorkflowUserTaskDefinition("System.WorkflowActivityRecord_WorkflowUserTaskDefinition");

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

	public WorkflowActivityRecord(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, entityName));
	}

	protected WorkflowActivityRecord(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject workflowActivityRecordMendixObject)
	{
		if (workflowActivityRecordMendixObject == null) {
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		}
		if (!com.mendix.core.Core.isSubClassOf(entityName, workflowActivityRecordMendixObject.getType())) {
			throw new java.lang.IllegalArgumentException(String.format("The given object is not a %s", entityName));
		}	

		this.workflowActivityRecordMendixObject = workflowActivityRecordMendixObject;
		this.context = context;
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 * @param context The context to be used
	 * @param mendixObject The Mendix object for the new instance
	 * @return a new instance of this proxy class
	 */
	public static system.proxies.WorkflowActivityRecord initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new system.proxies.WorkflowActivityRecord(context, mendixObject);
	}

	public static system.proxies.WorkflowActivityRecord load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return system.proxies.WorkflowActivityRecord.initialize(context, mendixObject);
	}

	/**
	 * @return value of ModelGUID
	 */
	public final java.lang.String getModelGUID()
	{
		return getModelGUID(getContext());
	}

	/**
	 * @param context
	 * @return value of ModelGUID
	 */
	public final java.lang.String getModelGUID(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.ModelGUID.toString());
	}

	/**
	 * Set value of ModelGUID
	 * @param modelguid
	 */
	public final void setModelGUID(java.lang.String modelguid)
	{
		setModelGUID(getContext(), modelguid);
	}

	/**
	 * Set value of ModelGUID
	 * @param context
	 * @param modelguid
	 */
	public final void setModelGUID(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String modelguid)
	{
		getMendixObject().setValue(context, MemberNames.ModelGUID.toString(), modelguid);
	}

	/**
	 * @return value of ActivityKey
	 */
	public final java.lang.String getActivityKey()
	{
		return getActivityKey(getContext());
	}

	/**
	 * @param context
	 * @return value of ActivityKey
	 */
	public final java.lang.String getActivityKey(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.ActivityKey.toString());
	}

	/**
	 * Set value of ActivityKey
	 * @param activitykey
	 */
	public final void setActivityKey(java.lang.String activitykey)
	{
		setActivityKey(getContext(), activitykey);
	}

	/**
	 * Set value of ActivityKey
	 * @param context
	 * @param activitykey
	 */
	public final void setActivityKey(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String activitykey)
	{
		getMendixObject().setValue(context, MemberNames.ActivityKey.toString(), activitykey);
	}

	/**
	 * @return value of PreviousActivityKey
	 */
	public final java.lang.String getPreviousActivityKey()
	{
		return getPreviousActivityKey(getContext());
	}

	/**
	 * @param context
	 * @return value of PreviousActivityKey
	 */
	public final java.lang.String getPreviousActivityKey(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.PreviousActivityKey.toString());
	}

	/**
	 * Set value of PreviousActivityKey
	 * @param previousactivitykey
	 */
	public final void setPreviousActivityKey(java.lang.String previousactivitykey)
	{
		setPreviousActivityKey(getContext(), previousactivitykey);
	}

	/**
	 * Set value of PreviousActivityKey
	 * @param context
	 * @param previousactivitykey
	 */
	public final void setPreviousActivityKey(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String previousactivitykey)
	{
		getMendixObject().setValue(context, MemberNames.PreviousActivityKey.toString(), previousactivitykey);
	}

	/**
	 * Get value of ActivityType
	 * @param activitytype
	 */
	public final system.proxies.WorkflowActivityType getActivityType()
	{
		return getActivityType(getContext());
	}

	/**
	 * @param context
	 * @return value of ActivityType
	 */
	public final system.proxies.WorkflowActivityType getActivityType(com.mendix.systemwideinterfaces.core.IContext context)
	{
		Object obj = getMendixObject().getValue(context, MemberNames.ActivityType.toString());
		if (obj == null) {
			return null;
		}
		return system.proxies.WorkflowActivityType.valueOf((java.lang.String) obj);
	}

	/**
	 * Set value of ActivityType
	 * @param activitytype
	 */
	public final void setActivityType(system.proxies.WorkflowActivityType activitytype)
	{
		setActivityType(getContext(), activitytype);
	}

	/**
	 * Set value of ActivityType
	 * @param context
	 * @param activitytype
	 */
	public final void setActivityType(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.WorkflowActivityType activitytype)
	{
		if (activitytype != null) {
			getMendixObject().setValue(context, MemberNames.ActivityType.toString(), activitytype.toString());
		} else {
			getMendixObject().setValue(context, MemberNames.ActivityType.toString(), null);
		}
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
	 * Get value of State
	 * @param state
	 */
	public final system.proxies.WorkflowActivityExecutionState getState()
	{
		return getState(getContext());
	}

	/**
	 * @param context
	 * @return value of State
	 */
	public final system.proxies.WorkflowActivityExecutionState getState(com.mendix.systemwideinterfaces.core.IContext context)
	{
		Object obj = getMendixObject().getValue(context, MemberNames.State.toString());
		if (obj == null) {
			return null;
		}
		return system.proxies.WorkflowActivityExecutionState.valueOf((java.lang.String) obj);
	}

	/**
	 * Set value of State
	 * @param state
	 */
	public final void setState(system.proxies.WorkflowActivityExecutionState state)
	{
		setState(getContext(), state);
	}

	/**
	 * Set value of State
	 * @param context
	 * @param state
	 */
	public final void setState(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.WorkflowActivityExecutionState state)
	{
		if (state != null) {
			getMendixObject().setValue(context, MemberNames.State.toString(), state.toString());
		} else {
			getMendixObject().setValue(context, MemberNames.State.toString(), null);
		}
	}

	/**
	 * @return value of StartTime
	 */
	public final java.util.Date getStartTime()
	{
		return getStartTime(getContext());
	}

	/**
	 * @param context
	 * @return value of StartTime
	 */
	public final java.util.Date getStartTime(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.util.Date) getMendixObject().getValue(context, MemberNames.StartTime.toString());
	}

	/**
	 * Set value of StartTime
	 * @param starttime
	 */
	public final void setStartTime(java.util.Date starttime)
	{
		setStartTime(getContext(), starttime);
	}

	/**
	 * Set value of StartTime
	 * @param context
	 * @param starttime
	 */
	public final void setStartTime(com.mendix.systemwideinterfaces.core.IContext context, java.util.Date starttime)
	{
		getMendixObject().setValue(context, MemberNames.StartTime.toString(), starttime);
	}

	/**
	 * @return value of EndTime
	 */
	public final java.util.Date getEndTime()
	{
		return getEndTime(getContext());
	}

	/**
	 * @param context
	 * @return value of EndTime
	 */
	public final java.util.Date getEndTime(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.util.Date) getMendixObject().getValue(context, MemberNames.EndTime.toString());
	}

	/**
	 * Set value of EndTime
	 * @param endtime
	 */
	public final void setEndTime(java.util.Date endtime)
	{
		setEndTime(getContext(), endtime);
	}

	/**
	 * Set value of EndTime
	 * @param context
	 * @param endtime
	 */
	public final void setEndTime(com.mendix.systemwideinterfaces.core.IContext context, java.util.Date endtime)
	{
		getMendixObject().setValue(context, MemberNames.EndTime.toString(), endtime);
	}

	/**
	 * @return value of Outcome
	 */
	public final java.lang.String getOutcome()
	{
		return getOutcome(getContext());
	}

	/**
	 * @param context
	 * @return value of Outcome
	 */
	public final java.lang.String getOutcome(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Outcome.toString());
	}

	/**
	 * Set value of Outcome
	 * @param outcome
	 */
	public final void setOutcome(java.lang.String outcome)
	{
		setOutcome(getContext(), outcome);
	}

	/**
	 * Set value of Outcome
	 * @param context
	 * @param outcome
	 */
	public final void setOutcome(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String outcome)
	{
		getMendixObject().setValue(context, MemberNames.Outcome.toString(), outcome);
	}

	/**
	 * @return value of MicroflowName
	 */
	public final java.lang.String getMicroflowName()
	{
		return getMicroflowName(getContext());
	}

	/**
	 * @param context
	 * @return value of MicroflowName
	 */
	public final java.lang.String getMicroflowName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.MicroflowName.toString());
	}

	/**
	 * Set value of MicroflowName
	 * @param microflowname
	 */
	public final void setMicroflowName(java.lang.String microflowname)
	{
		setMicroflowName(getContext(), microflowname);
	}

	/**
	 * Set value of MicroflowName
	 * @param context
	 * @param microflowname
	 */
	public final void setMicroflowName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String microflowname)
	{
		getMendixObject().setValue(context, MemberNames.MicroflowName.toString(), microflowname);
	}

	/**
	 * @return value of TaskName
	 */
	public final java.lang.String getTaskName()
	{
		return getTaskName(getContext());
	}

	/**
	 * @param context
	 * @return value of TaskName
	 */
	public final java.lang.String getTaskName(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.TaskName.toString());
	}

	/**
	 * Set value of TaskName
	 * @param taskname
	 */
	public final void setTaskName(java.lang.String taskname)
	{
		setTaskName(getContext(), taskname);
	}

	/**
	 * Set value of TaskName
	 * @param context
	 * @param taskname
	 */
	public final void setTaskName(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String taskname)
	{
		getMendixObject().setValue(context, MemberNames.TaskName.toString(), taskname);
	}

	/**
	 * @return value of TaskDescription
	 */
	public final java.lang.String getTaskDescription()
	{
		return getTaskDescription(getContext());
	}

	/**
	 * @param context
	 * @return value of TaskDescription
	 */
	public final java.lang.String getTaskDescription(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.TaskDescription.toString());
	}

	/**
	 * Set value of TaskDescription
	 * @param taskdescription
	 */
	public final void setTaskDescription(java.lang.String taskdescription)
	{
		setTaskDescription(getContext(), taskdescription);
	}

	/**
	 * Set value of TaskDescription
	 * @param context
	 * @param taskdescription
	 */
	public final void setTaskDescription(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String taskdescription)
	{
		getMendixObject().setValue(context, MemberNames.TaskDescription.toString(), taskdescription);
	}

	/**
	 * @return value of TaskDueDate
	 */
	public final java.util.Date getTaskDueDate()
	{
		return getTaskDueDate(getContext());
	}

	/**
	 * @param context
	 * @return value of TaskDueDate
	 */
	public final java.util.Date getTaskDueDate(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.util.Date) getMendixObject().getValue(context, MemberNames.TaskDueDate.toString());
	}

	/**
	 * Set value of TaskDueDate
	 * @param taskduedate
	 */
	public final void setTaskDueDate(java.util.Date taskduedate)
	{
		setTaskDueDate(getContext(), taskduedate);
	}

	/**
	 * Set value of TaskDueDate
	 * @param context
	 * @param taskduedate
	 */
	public final void setTaskDueDate(com.mendix.systemwideinterfaces.core.IContext context, java.util.Date taskduedate)
	{
		getMendixObject().setValue(context, MemberNames.TaskDueDate.toString(), taskduedate);
	}

	/**
	 * Get value of TaskCompletionType
	 * @param taskcompletiontype
	 */
	public final system.proxies.WorkflowUserTaskCompletionType getTaskCompletionType()
	{
		return getTaskCompletionType(getContext());
	}

	/**
	 * @param context
	 * @return value of TaskCompletionType
	 */
	public final system.proxies.WorkflowUserTaskCompletionType getTaskCompletionType(com.mendix.systemwideinterfaces.core.IContext context)
	{
		Object obj = getMendixObject().getValue(context, MemberNames.TaskCompletionType.toString());
		if (obj == null) {
			return null;
		}
		return system.proxies.WorkflowUserTaskCompletionType.valueOf((java.lang.String) obj);
	}

	/**
	 * Set value of TaskCompletionType
	 * @param taskcompletiontype
	 */
	public final void setTaskCompletionType(system.proxies.WorkflowUserTaskCompletionType taskcompletiontype)
	{
		setTaskCompletionType(getContext(), taskcompletiontype);
	}

	/**
	 * Set value of TaskCompletionType
	 * @param context
	 * @param taskcompletiontype
	 */
	public final void setTaskCompletionType(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.WorkflowUserTaskCompletionType taskcompletiontype)
	{
		if (taskcompletiontype != null) {
			getMendixObject().setValue(context, MemberNames.TaskCompletionType.toString(), taskcompletiontype.toString());
		} else {
			getMendixObject().setValue(context, MemberNames.TaskCompletionType.toString(), null);
		}
	}

	/**
	 * @return value of TaskRequiredUsers
	 */
	public final java.lang.Integer getTaskRequiredUsers()
	{
		return getTaskRequiredUsers(getContext());
	}

	/**
	 * @param context
	 * @return value of TaskRequiredUsers
	 */
	public final java.lang.Integer getTaskRequiredUsers(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Integer) getMendixObject().getValue(context, MemberNames.TaskRequiredUsers.toString());
	}

	/**
	 * Set value of TaskRequiredUsers
	 * @param taskrequiredusers
	 */
	public final void setTaskRequiredUsers(java.lang.Integer taskrequiredusers)
	{
		setTaskRequiredUsers(getContext(), taskrequiredusers);
	}

	/**
	 * Set value of TaskRequiredUsers
	 * @param context
	 * @param taskrequiredusers
	 */
	public final void setTaskRequiredUsers(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Integer taskrequiredusers)
	{
		getMendixObject().setValue(context, MemberNames.TaskRequiredUsers.toString(), taskrequiredusers);
	}

	/**
	 * @return value of Reason
	 */
	public final java.lang.String getReason()
	{
		return getReason(getContext());
	}

	/**
	 * @param context
	 * @return value of Reason
	 */
	public final java.lang.String getReason(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Reason.toString());
	}

	/**
	 * Set value of Reason
	 * @param reason
	 */
	public final void setReason(java.lang.String reason)
	{
		setReason(getContext(), reason);
	}

	/**
	 * Set value of Reason
	 * @param context
	 * @param reason
	 */
	public final void setReason(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String reason)
	{
		getMendixObject().setValue(context, MemberNames.Reason.toString(), reason);
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of WorkflowActivityRecord_PreviousActivity
	 */
	public final system.proxies.WorkflowActivityRecord getWorkflowActivityRecord_PreviousActivity() throws com.mendix.core.CoreException
	{
		return getWorkflowActivityRecord_PreviousActivity(getContext());
	}

	/**
	 * @param context
	 * @return value of WorkflowActivityRecord_PreviousActivity
	 * @throws com.mendix.core.CoreException
	 */
	public final system.proxies.WorkflowActivityRecord getWorkflowActivityRecord_PreviousActivity(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		system.proxies.WorkflowActivityRecord result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.WorkflowActivityRecord_PreviousActivity.toString());
		if (identifier != null) {
			result = system.proxies.WorkflowActivityRecord.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of WorkflowActivityRecord_PreviousActivity
	 * @param workflowactivityrecord_previousactivity
	 */
	public final void setWorkflowActivityRecord_PreviousActivity(system.proxies.WorkflowActivityRecord workflowactivityrecord_previousactivity)
	{
		setWorkflowActivityRecord_PreviousActivity(getContext(), workflowactivityrecord_previousactivity);
	}

	/**
	 * Set value of WorkflowActivityRecord_PreviousActivity
	 * @param context
	 * @param workflowactivityrecord_previousactivity
	 */
	public final void setWorkflowActivityRecord_PreviousActivity(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.WorkflowActivityRecord workflowactivityrecord_previousactivity)
	{
		if (workflowactivityrecord_previousactivity == null) {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_PreviousActivity.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_PreviousActivity.toString(), workflowactivityrecord_previousactivity.getMendixObject().getId());
		}
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of WorkflowActivityRecord_Actor
	 */
	public final system.proxies.User getWorkflowActivityRecord_Actor() throws com.mendix.core.CoreException
	{
		return getWorkflowActivityRecord_Actor(getContext());
	}

	/**
	 * @param context
	 * @return value of WorkflowActivityRecord_Actor
	 * @throws com.mendix.core.CoreException
	 */
	public final system.proxies.User getWorkflowActivityRecord_Actor(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		system.proxies.User result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.WorkflowActivityRecord_Actor.toString());
		if (identifier != null) {
			result = system.proxies.User.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of WorkflowActivityRecord_Actor
	 * @param workflowactivityrecord_actor
	 */
	public final void setWorkflowActivityRecord_Actor(system.proxies.User workflowactivityrecord_actor)
	{
		setWorkflowActivityRecord_Actor(getContext(), workflowactivityrecord_actor);
	}

	/**
	 * Set value of WorkflowActivityRecord_Actor
	 * @param context
	 * @param workflowactivityrecord_actor
	 */
	public final void setWorkflowActivityRecord_Actor(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.User workflowactivityrecord_actor)
	{
		if (workflowactivityrecord_actor == null) {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_Actor.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_Actor.toString(), workflowactivityrecord_actor.getMendixObject().getId());
		}
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of WorkflowActivityRecord_SubWorkflow
	 */
	public final system.proxies.WorkflowRecord getWorkflowActivityRecord_SubWorkflow() throws com.mendix.core.CoreException
	{
		return getWorkflowActivityRecord_SubWorkflow(getContext());
	}

	/**
	 * @param context
	 * @return value of WorkflowActivityRecord_SubWorkflow
	 * @throws com.mendix.core.CoreException
	 */
	public final system.proxies.WorkflowRecord getWorkflowActivityRecord_SubWorkflow(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		system.proxies.WorkflowRecord result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.WorkflowActivityRecord_SubWorkflow.toString());
		if (identifier != null) {
			result = system.proxies.WorkflowRecord.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of WorkflowActivityRecord_SubWorkflow
	 * @param workflowactivityrecord_subworkflow
	 */
	public final void setWorkflowActivityRecord_SubWorkflow(system.proxies.WorkflowRecord workflowactivityrecord_subworkflow)
	{
		setWorkflowActivityRecord_SubWorkflow(getContext(), workflowactivityrecord_subworkflow);
	}

	/**
	 * Set value of WorkflowActivityRecord_SubWorkflow
	 * @param context
	 * @param workflowactivityrecord_subworkflow
	 */
	public final void setWorkflowActivityRecord_SubWorkflow(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.WorkflowRecord workflowactivityrecord_subworkflow)
	{
		if (workflowactivityrecord_subworkflow == null) {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_SubWorkflow.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_SubWorkflow.toString(), workflowactivityrecord_subworkflow.getMendixObject().getId());
		}
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of WorkflowActivityRecord_UserTask
	 */
	public final system.proxies.WorkflowUserTask getWorkflowActivityRecord_UserTask() throws com.mendix.core.CoreException
	{
		return getWorkflowActivityRecord_UserTask(getContext());
	}

	/**
	 * @param context
	 * @return value of WorkflowActivityRecord_UserTask
	 * @throws com.mendix.core.CoreException
	 */
	public final system.proxies.WorkflowUserTask getWorkflowActivityRecord_UserTask(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		system.proxies.WorkflowUserTask result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.WorkflowActivityRecord_UserTask.toString());
		if (identifier != null) {
			result = system.proxies.WorkflowUserTask.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of WorkflowActivityRecord_UserTask
	 * @param workflowactivityrecord_usertask
	 */
	public final void setWorkflowActivityRecord_UserTask(system.proxies.WorkflowUserTask workflowactivityrecord_usertask)
	{
		setWorkflowActivityRecord_UserTask(getContext(), workflowactivityrecord_usertask);
	}

	/**
	 * Set value of WorkflowActivityRecord_UserTask
	 * @param context
	 * @param workflowactivityrecord_usertask
	 */
	public final void setWorkflowActivityRecord_UserTask(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.WorkflowUserTask workflowactivityrecord_usertask)
	{
		if (workflowactivityrecord_usertask == null) {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_UserTask.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_UserTask.toString(), workflowactivityrecord_usertask.getMendixObject().getId());
		}
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of WorkflowActivityRecord_WorkflowUserTaskDefinition
	 */
	public final system.proxies.WorkflowUserTaskDefinition getWorkflowActivityRecord_WorkflowUserTaskDefinition() throws com.mendix.core.CoreException
	{
		return getWorkflowActivityRecord_WorkflowUserTaskDefinition(getContext());
	}

	/**
	 * @param context
	 * @return value of WorkflowActivityRecord_WorkflowUserTaskDefinition
	 * @throws com.mendix.core.CoreException
	 */
	public final system.proxies.WorkflowUserTaskDefinition getWorkflowActivityRecord_WorkflowUserTaskDefinition(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		system.proxies.WorkflowUserTaskDefinition result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.WorkflowActivityRecord_WorkflowUserTaskDefinition.toString());
		if (identifier != null) {
			result = system.proxies.WorkflowUserTaskDefinition.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of WorkflowActivityRecord_WorkflowUserTaskDefinition
	 * @param workflowactivityrecord_workflowusertaskdefinition
	 */
	public final void setWorkflowActivityRecord_WorkflowUserTaskDefinition(system.proxies.WorkflowUserTaskDefinition workflowactivityrecord_workflowusertaskdefinition)
	{
		setWorkflowActivityRecord_WorkflowUserTaskDefinition(getContext(), workflowactivityrecord_workflowusertaskdefinition);
	}

	/**
	 * Set value of WorkflowActivityRecord_WorkflowUserTaskDefinition
	 * @param context
	 * @param workflowactivityrecord_workflowusertaskdefinition
	 */
	public final void setWorkflowActivityRecord_WorkflowUserTaskDefinition(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.WorkflowUserTaskDefinition workflowactivityrecord_workflowusertaskdefinition)
	{
		if (workflowactivityrecord_workflowusertaskdefinition == null) {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_WorkflowUserTaskDefinition.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.WorkflowActivityRecord_WorkflowUserTaskDefinition.toString(), workflowactivityrecord_workflowusertaskdefinition.getMendixObject().getId());
		}
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return workflowActivityRecordMendixObject;
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
			final system.proxies.WorkflowActivityRecord that = (system.proxies.WorkflowActivityRecord) obj;
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
