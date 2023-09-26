const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
// Arreglo de objetos de categorías
// ID (entero autoincremental)
// Fecha de pedido (fecha y hora)
// ID del cliente (entero)
// Total (decimal)
let orders = [
  { id: 1, date: "2015-03-10T12:00:00Z", idClient: 1, total: 200 },
  { id: 2, date: "2020-05-05T12:00:00Z", idClient: 1, total: 200 },
  { id: 3, date: "2023-06-22T12:00:00Z", idClient: 1, total: 200 },
  { id: 4, date: "2022-08-23T12:00:00Z", idClient: 1, total: 200 },
  { id: 5, date: "2022-10-27T12:00:00Z", idClient: 1, total: 200 },
  { id: 6, date: "2021-11-18T12:00:00Z", idClient: 1, total: 200 },
  { id: 7, date: "2021-12-01T12:00:00Z", idClient: 1, total: 200 },
  { id: 8, date: "2022-01-22T12:00:00Z", idClient: 1, total: 200 },
  { id: 9, date: "2023-04-30T12:00:00Z", idClient: 1, total: 200 },
  { id: 10, date: "2023-03-15T12:00:00Z", idClient: 1, total: 200 },
];

app.get("/partners/v1/orders", (req, res) => {
  // obtener todos los recursos - obtener todas los pedidos
  // 1. Verificar si existen pedidos
  if (orders) {
    res.status(200).json({
      status: 1,
      message: "Existen pedidos.",
      orders: orders,
    });
  } else {
    res.status(404).json({
      status: 0,
      message: "No existen pedidos.",
      orders: orders,
    });
  }
});
app.get("/partners/v1/orders/:id", (req, res) => {
  const id = req.params.id;
  const order = orders.find((orders) => orders.id == id);
  if (order) {
    res.status(200).json({
      status: 1,
      message: "Pedido encontrado.",
      order: order,
    });
  } else {
    res.status(404).json({
      status: 0,
      message: "Pedido no encontrado.",
      order: order,
    });
  }
});

app.post("/partners/v1/orders", (req, res) => {
  // crear un recurso - crear un pedido
  // Requerimientos
  // ID (entero autoincremental)
  // Fecha de pedido (fecha y hora)
  // ID del cliente (entero)
  // Total (decimal)
  const { date, idClient, total } = req.body;
  const id = Math.round(Math.random() * 1000);
  if (!date || !idClient || !total) {
    res.status(400).json({
      status: 0,
      message: "Faltan parámetros en la solicitud (Bad Request).",
    });
  } else {
    const order = { id, date, idClient, total };
    const lengthInit = orders.length;
    orders.push(order);
    if (orders.length > lengthInit) {
      res.status(201).json({
        status: 1,
        message: "Pedido creado correctamente.",
        order,
      });
    } else {
      res.status(500).json({
        status: 0,
        message: "Ocurrió un error desconocido.",
      });
    }
  }
});

app.put("/partners/v1/orders/:id", (req, res) => {
  const { id } = req.params;
  const { date, idClient, total } = req.body;
  if (!date || !idClient || !total) {
    res.status(400).json({
      status: 0,
      message: "Faltan parámetros en la solicitud (Bad Request).",
    });
  } else {
    const indexUpdate = orders.findIndex((order) => order.id == id);
    if (indexUpdate != -1) {
      // Si encontró la categoría //console.log(indexUpdate); //console.log("Entré al if/////////////////");
      orders[indexUpdate].date = date;
      orders[indexUpdate].idClient = idClient;
      orders[indexUpdate].total = total;
      res.status(200).json({
        status: 1,
        message: "Pedido actualizado.",
        orders: orders[indexUpdate],
      });
    } else {
      res.status(404).json({
        status: 0,
        message: "Pedido no encontrado",
      });
    }
  }
});

app.delete("/partners/v1/orders/:id", (req, res) => {
  const { id } = req.params;
  const indexDelete = orders.findIndex((order) => order.id == id);
  if (indexDelete != -1) {
    orders.splice(indexDelete, 1);
    res.status(201).json({
      status: 1,
      message: "Pedido eliminado correctamente.",
    });
  } else {
    res.status(404).json({
      status: 0,
      message: "Pedido no encontrado.",
    });
  }
});

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto: ", port);
});
