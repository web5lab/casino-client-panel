import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';    

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let userBalances = {};
let transactionHistory = {};

// Route to store user balance
app.post('/balance', (req, res) => {
  const { userId, balance } = req.body;
  userBalances[userId] = balance;
  res.status(200).send({ message: 'Balance updated successfully' });
});

// Route to get user balance
app.get('/balance/:userId', (req, res) => {
  const { userId } = req.params;
  const balance = userBalances[userId];
  if (balance !== undefined) {
    res.status(200).send({ userId, balance });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

// Route to store transaction history
app.post('/transaction', (req, res) => {
  const { userId, transaction } = req.body;
  if (!transactionHistory[userId]) {
    transactionHistory[userId] = [];
  }
  transactionHistory[userId].push(transaction);
  res.status(200).send({ message: 'Transaction recorded successfully' });
});

// Route to get transaction history
app.get('/transaction/:userId', (req, res) => {
  const { userId } = req.params;
  const transactions = transactionHistory[userId];
  if (transactions) {
    res.status(200).send({ userId, transactions });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});