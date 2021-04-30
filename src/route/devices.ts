import express from 'express';
import {
    getDevices,
    disableDevice,
    updateDeviceName,
    proxy2ws,
    updateChannelName,
    getOTAinfo,
    getDeviceById,
    upgradeDevice,
    updateDiyDevice,
    removeDiyDevice,
    changeUnit,
    setRate,
} from '../services/devices';
const router = express.Router();

router.get('/', getDevices);
router.get(
    '/refresh',
    (req, res, next) => {
        req.body.refresh = true;
        next();
    },
    getDevices
);
router.get('/device', getDeviceById);
router.post('/device/upgrade', upgradeDevice);
router.post('/disabled', disableDevice);
router.post('/updateName', updateDeviceName);
router.post('/updateChannelName', updateChannelName);
router.post('/proxy2ws', proxy2ws);
router.post('/getOTAinfo', getOTAinfo);
router.post('/diy', updateDiyDevice);
router.post('/device/unit', changeUnit);
router.post('/device/rate', setRate);
router.delete('/diy', removeDiyDevice);

export default router;
