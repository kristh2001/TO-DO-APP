// routers/index.js

const express = require('express');
const router = express.Router();
const connection = require('../dbToDo'); // Update the path accordingly

router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM ToDo', (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      next(err);
    } else {
      res.render('index', { title: 'To-Do List', toDo: results });
    }
  });
});

router.post('/addTask', (req, res, next) => {
  const { task } = req.body;

  const insertQuery = 'INSERT INTO ToDo (task) VALUES (?)';
  const values = [task];

  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting task:', err);
      next(err);
    } else {
      console.log('Task added successfully!');
      res.redirect('/');
    }
  });
});

router.post('/deleteTask', (req, res, next) => {
  const { id } = req.body; // Assuming 'id' is the name of your auto-incremental ID column

  const deleteQuery = 'DELETE FROM ToDo WHERE id = ?';

  connection.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error('Error deleting task:', err);
      next(err);
    } else {
      console.log('Task deleted successfully!');
      res.redirect('/');
    }
  });
});

router.get('/editTask', (req, res, next) => {
  const { id } = req.query;
  console.log('taskId:', id);
  const selectQuery = 'SELECT * FROM ToDo WHERE id = ?';

  connection.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving task for edit:', err);
      next(err);
    } else {
      if (results.length > 0) {
        res.render('editTask', { title: 'Edit Task', task: results[0] });
      } else {
        res.status(404).send('Task not found');
      }
    }
  });
});

router.post('/updateTask', (req, res, next) => {
  const { id, task } = req.body;

  const updateQuery = 'UPDATE ToDo SET task = ? WHERE id = ?';
  const values = [task, id];

  connection.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error('Error updating task:', err);
      next(err);
    } else {
      console.log('Task updated successfully!');
      res.redirect('/');
    }
  });
});

module.exports = router;
