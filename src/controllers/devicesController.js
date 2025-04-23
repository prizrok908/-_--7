const db = require('../db/db');

exports.getAllDevices = async (req, res) => {
  try {
    const devices = await db.getAllDevices();
    res.json(devices);
  } catch (error) {
    console.error('Ошибка в getAllDevices:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

exports.getDeviceById = async (req, res) => {
  try {
    const id = req.params.id;
    const device = await db.getDeviceById(id);

    if (!device) {
      return res.status(404).json({ error: 'Устройство не найдено' });
    }

    res.json(device);
  } catch (error) {
    console.error('Ошибка в getDeviceById:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

exports.addDevice = async (req, res) => {
  try {
    const { name, number } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Поле "name" должно быть непустой строкой' });
    }
    if (!number || typeof number !== 'number') {
      return res.status(400).json({ error: 'Поле "number" должно быть числом' });
    }

    const newDevice = await db.addDevice({ name, number });
    res.status(201).json(newDevice);
  } catch (error) {
    console.error('Ошибка в addDevice:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await db.deleteDevice(id);

    if (!success) {
      return res.status(404).json({ error: 'Устройство не найдено' });
    }

    res.status(200).json({ message: 'Устройство успешно удалено' });
  } catch (error) {
    console.error('Ошибка в deleteDevice:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};