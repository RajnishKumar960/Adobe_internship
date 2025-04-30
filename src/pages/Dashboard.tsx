import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Check, Plus, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem('tasks');
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
        
        if (user) {
          setTasks(parsedTasks.filter((task: Task) => task.userId === user.id));
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTasks();
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const otherUserTasks = allTasks.filter((task: Task) => task.userId !== user?.id);
      
      localStorage.setItem('tasks', JSON.stringify([...otherUserTasks, ...tasks]));
    }
  }, [tasks, user, isLoading]);

  const addTask = () => {
    if (!newTask.trim() || !user) return;
    
    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.trim(),
      completed: false,
      userId: user.id,
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] page-background bg-dashboard">
      <div className="content-wrapper min-h-[calc(100vh-64px)] p-4">
        <div className="max-w-lg mx-auto backdrop-blur-sm bg-white/90 p-8 rounded-xl shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name}! Manage your tasks below.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <button
                onClick={addTask}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="mt-2 text-gray-600">Loading your tasks...</p>
            </div>
          ) : (
            <>
              {tasks.length === 0 ? (
                <div className="text-center py-8 bg-gray-50/50 rounded-lg">
                  <p className="text-gray-500">You have no tasks yet.</p>
                  <p className="text-gray-500 mt-1">Add a task to get started!</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <li 
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-white/80 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center ${
                            task.completed ? 'bg-green-500 border-green-500' : 'hover:border-blue-500'
                          }`}
                        >
                          {task.completed && <Check size={14} className="text-white" />}
                        </button>
                        <span 
                          className={`text-gray-800 ${
                            task.completed ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;