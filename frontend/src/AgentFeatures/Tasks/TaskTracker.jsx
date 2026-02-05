import React, {useState, useEffect} from "react";
import axios from "axios";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import AIContextBox from "../../Components/AIContextBox";
import "./TaskTracker.css";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskInterval, setNewTaskInterval] = useState(7);
  const [completionDate, setCompletionDate] = useState(new Date().toISOString().split("T")[0]);
  const [wishEarlier, setWishEarlier] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskMessage, setTaskMessage] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const token = localStorage.getItem("agentToken");
    try {
      const response = await axios.get("/api/agent/tasks", {
        headers: {Authorization: token},
      });
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  const handleCompleteTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("agentToken");

    if (!selectedTaskId && !newTaskName.trim()) {
      return;
    }

    try {
      let taskId = selectedTaskId;
      let taskName = "";

      if (!selectedTaskId && newTaskName.trim()) {
        const createResponse = await axios.post(
          "/api/agent/tasks",
          {
            name: newTaskName.trim(),
            defaultInterval: parseInt(newTaskInterval),
          },
          {headers: {Authorization: token}},
        );
        taskId = createResponse.data.id;
        taskName = createResponse.data.name;
      }

      const response = await axios.post(
        `/api/agent/tasks/${taskId}/complete`,
        {
          completedAt: completionDate,
          wishEarlier: wishEarlier,
        },
        {headers: {Authorization: token}},
      );

      if (selectedTaskId) {
        setTasks(tasks.map((t) => (t.id === taskId ? response.data.task : t)));
        taskName = tasks.find((t) => t.id === taskId)?.name || "";
      } else {
        setTasks([...tasks, response.data.task]);
      }

      setTaskMessage({type: "success", text: `Logged: ${taskName}`});
      setTimeout(() => setTaskMessage(null), 3000);

      setSelectedTaskId("");
      setNewTaskName("");
      setNewTaskInterval(7);
      setCompletionDate(new Date().toISOString().split("T")[0]);
      setWishEarlier(null);
      setShowAddTask(false);
    } catch (error) {
      console.error("Error completing task:", error);
      setTaskMessage({type: "error", text: "Failed to log task"});
      setTimeout(() => setTaskMessage(null), 3000);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("agentToken");
    if (!window.confirm("Delete this task and all its history?")) return;

    try {
      await axios.delete(`/api/agent/tasks/${taskId}`, {
        headers: {Authorization: token},
      });
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const getDaysUntilDue = (nextDueAt) => {
    if (!nextDueAt) return null;
    const now = new Date();
    const due = new Date(nextDueAt);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <TwoColumnLayout
      left={
        <div>
          {/* Task Completion Form */}
          <div className="task-completion">
            <h2 className="task-completion__title">Log a Task</h2>

            {taskMessage && (
              <div className={`message ${taskMessage.type === "success" ? "message--success" : "message--error"}`}>{taskMessage.text}</div>
            )}

            <form onSubmit={handleCompleteTask} className="task-completion__form">
              <div className="task-completion__field">
                <label className="task-completion__label">What task did you do?</label>
                <div className="task-completion__select-row">
                  <select value={selectedTaskId} onChange={(e) => setSelectedTaskId(e.target.value)} className="task-completion__select">
                    <option value="">Select a task...</option>
                    {tasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.name}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setShowAddTask(!showAddTask)} className="btn btn--success">
                    {showAddTask ? "Cancel" : "+ New Task"}
                  </button>
                </div>
              </div>

              {showAddTask && (
                <div className="task-completion__new-task">
                  <h3 className="task-completion__new-task-title">New Task Details</h3>
                  <div className="task-completion__new-task-fields">
                    <div>
                      <label className="task-completion__label">Task Name</label>
                      <input
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="e.g., Made cold brew"
                        className="task-completion__input task-completion__input--full"
                      />
                    </div>
                    <div>
                      <label className="task-completion__label">Repeat every (days)</label>
                      <input
                        type="number"
                        min="1"
                        value={newTaskInterval}
                        onChange={(e) => setNewTaskInterval(e.target.value)}
                        className="task-completion__input task-completion__input--interval"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="task-completion__field">
                <label className="task-completion__label">When did you do it?</label>
                <input
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="task-completion__input task-completion__input--date"
                />
              </div>

              <div className="task-completion__field">
                <label className="task-completion__label">Do you wish you did it sooner?</label>
                <div className="task-completion__radio-group">
                  <label className="task-completion__radio-label">
                    <input
                      type="radio"
                      name="wishEarlier"
                      checked={wishEarlier === true}
                      onChange={() => setWishEarlier(true)}
                      className="task-completion__radio-input"
                    />
                    Yes, wish I did it sooner
                  </label>
                  <label className="task-completion__radio-label">
                    <input
                      type="radio"
                      name="wishEarlier"
                      checked={wishEarlier === false}
                      onChange={() => setWishEarlier(false)}
                      className="task-completion__radio-input"
                    />
                    No, timing was fine
                  </label>
                  <label className="task-completion__radio-label">
                    <input
                      type="radio"
                      name="wishEarlier"
                      checked={wishEarlier === null}
                      onChange={() => setWishEarlier(null)}
                      className="task-completion__radio-input"
                    />
                    Not sure
                  </label>
                </div>
              </div>

              <button type="submit" disabled={!selectedTaskId && !newTaskName.trim()} className="task-completion__submit">
                Log Task Completion
              </button>
            </form>
          </div>

          {/* Task List */}
          <div>
            <h2 className="task-list__title">Your Tasks</h2>

            {tasks.length === 0 ? (
              <div className="task-list__empty">No tasks yet. Create one above to get started!</div>
            ) : (
              <div className="task-list__items">
                {tasks.map((task) => {
                  const daysUntil = getDaysUntilDue(task.nextDueAt);
                  const isOverdue = daysUntil !== null && daysUntil < 0;
                  const isDueSoon = daysUntil !== null && daysUntil >= 0 && daysUntil <= 3;

                  return (
                    <div
                      key={task.id}
                      className={`task-item ${isOverdue ? "task-item--overdue" : isDueSoon ? "task-item--due-soon" : "task-item--future"}`}>
                      <div className="task-item__content">
                        <div className="task-item__main">
                          <h3 className="task-item__name">{task.name}</h3>

                          <div className="task-item__info">
                            Current interval: <strong>{task.currentInterval} days</strong>
                            {task.defaultInterval !== task.currentInterval && <span> (started at {task.defaultInterval} days)</span>}
                          </div>

                          {task.lastCompletedAt && (
                            <div className="task-item__info">Last completed: {new Date(task.lastCompletedAt).toLocaleDateString()}</div>
                          )}

                          {task.nextDueAt && (
                            <div
                              className={`task-item__due ${
                                isOverdue ? "task-item__due--overdue" : isDueSoon ? "task-item__due--due-soon" : "task-item__due--future"
                              }`}>
                              {isOverdue ? (
                                <span>OVERDUE by {Math.abs(daysUntil)} days!</span>
                              ) : isDueSoon ? (
                                <span>Due in {daysUntil} days</span>
                              ) : (
                                <span>Due in {daysUntil} days</span>
                              )}
                            </div>
                          )}
                        </div>

                        <button onClick={() => handleDeleteTask(task.id)} className="task-item__delete">
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      }
      right={<AIContextBox feature="tasks" />}
    />
  );
};

export default TaskTracker;
