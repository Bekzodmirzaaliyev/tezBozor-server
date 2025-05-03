const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require("./routes/authRoutes")
const product = require('./routes/productRoutes')

const app = express();
const PORT = process.env.PORT || 5000;

// ====================
// 🛡 CORS Мидлвар до всего
// ====================
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'application/json'],
    // credentials: true,
  })
);

// Для preflight-запросов (OPTIONS)
// app.options('*', cors());

// ====================
// 📦 Middleware
// ====================
app.use(express.json()); // Обязательно после CORS

// ====================
// 🔌 Подключаем MongoDB
// ====================
connectDB();

// ====================
// 📚 Swagger Docs
// ====================
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ====================
// 🚏 Роуты
// ====================
app.use("/api/v1", auth)
app.use('/api/v1', product)


// ====================
// 🧯 Глобальный Error Handler
// ====================
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


// ====================
// 🚀 Запуск сервера
// ====================
app.use("/" , (req, res) => {
    res.send("PALASTIN GEY")
})

app.listen(PORT, () => {
  console.log(`🔥 Server running on port http://localhost:${PORT}`);
});
