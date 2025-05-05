const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

let tasks = [];
let id = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: id++, name: req.body.name };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === +req.params.id);
  if (task) {
    task.name = req.body.name;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== +req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});