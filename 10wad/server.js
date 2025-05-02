const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

let tasks = [];
let id = 1;

app.get('/tasks', (req, res) => {
  console.log('GET /tasks');
  console.log('Current tasks:', tasks);
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: id++, name: req.body.name };
  tasks.push(task);
  console.log('POST /tasks - Added:', task);
  console.log('Current tasks:', tasks);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === +req.params.id);
  if (task) {
    task.name = req.body.name;
    console.log(`PUT /tasks/${req.params.id} - Updated to:`, task);
    console.log('Current tasks:', tasks);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== +req.params.id);
  console.log(`DELETE /tasks/${req.params.id} - Task deleted`);
  console.log('Current tasks:', tasks);
  res.status(204).end();
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
