const fs = require('fs-extra');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

const getAllDevices = async () => {
  try {
    const data = await fs.readJSON(DB_PATH);
    return data;
  } catch (error) {
    throw new Error(`Ошибка чтения файла db.json: ${error.message}`);
  }
};

const getDeviceById = async (id) => {
  try {
    const data = await fs.readJSON(DB_PATH);
    const device = data.find((item) => item.id === parseInt(id));
    return device;
  } catch (error) {
    throw new Error(`Ошибка чтения файла db.json: ${error.message}`);
  }
};

const addDevice = async (newData) => {
  try {
    const data = await fs.readJSON(DB_PATH);

    const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;

    const newDevice = {
      id: newId,
      name: newData.name || '',
      number: newData.number || 0,
      date: new Date().toISOString(),
    };

    data.push(newDevice);

    await fs.writeJSON(DB_PATH, data, { spaces: 2 });

    return newDevice;
  } catch (error) {
    throw new Error(`Ошибка записи в файл db.json: ${error.message}`);
  }
};

const deleteDevice = async (id) => {
  try {
    const data = await fs.readJSON(DB_PATH);

    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
      return false;
    }

    data.splice(index, 1);

    await fs.writeJSON(DB_PATH, data, { spaces: 2 });

    return true;
  } catch (error) {
    throw new Error(`Ошибка удаления устройства: ${error.message}`);
  }
};

module.exports = {
  getAllDevices,
  getDeviceById,
  addDevice,
  deleteDevice,
};