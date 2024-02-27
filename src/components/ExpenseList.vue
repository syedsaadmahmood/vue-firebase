<template>
    <div class="container">
      <h2>Expenses</h2>
      <div class="input-group">
        <input v-model="newExpenseName" placeholder="Expense Name" />
        <input v-model.number="newExpenseAmount" placeholder="Amount" type="number" />
        <button @click="addExpense">Add Expense</button>
      </div>
  
      <ul class="expense-list">
        <li v-for="expense in expenses" :key="expense.id">
          {{ expense.name }} - ${{ expense.amount }}
          <button @click="deleteExpense(expense.id)" class="delete-btn">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  <script>
  import { db } from '../firebase';
  import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const expenses = ref([]);
      const newExpenseName = ref('');
      const newExpenseAmount = ref(0);
      const expensesCollectionRef = collection(db, 'expenses');
  
      const fetchExpenses = async () => {
        const data = await getDocs(expensesCollectionRef);
        expenses.value = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      };
  
      const addExpense = async () => {
        await addDoc(expensesCollectionRef, {
          name: newExpenseName.value,
          amount: newExpenseAmount.value,
        });
        newExpenseName.value = '';
        newExpenseAmount.value = 0;
        fetchExpenses();
      };
  
      const deleteExpense = async (id) => {
        const expenseDoc = doc(db, 'expenses', id);
        await deleteDoc(expenseDoc);
        fetchExpenses();
      };
  
      onMounted(fetchExpenses);
  
      return { expenses, newExpenseName, newExpenseAmount, addExpense, deleteExpense };
    },
  };
  </script>
  
  <style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.input-group input,
.input-group button {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-group button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-color: #007bff;
}

.input-group button:hover {
  background-color: #0056b3;
}

.expense-list {
  list-style-type: none;
  padding: 0;
}

.expense-list li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>