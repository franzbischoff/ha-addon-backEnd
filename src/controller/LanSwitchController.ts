import axios from 'axios';
import { setSwitch } from '../apis/lanDeviceApi';
import { updateStates } from '../apis/restApi';
import AuthUtils from '../utils/lanControlAuthenticationUtils';
import LanDeviceController from './LanDeviceController';
type TypeConstrucotr = {
    deviceId: string;
    ip: string;
    port?: number;
    disabled: boolean;
    encryptedData?: string;
    iv: string;
};

class LanSwitchController extends LanDeviceController {
    deviceId: string;
    entityId: string;
    ip: string;
    port: number;
    disabled: boolean;
    iv?: string;
    encryptedData?: string;
    devicekey?: string;
    selfApikey?: string;
    deviceName?: string;
    setSwitch!: (status: string) => Promise<void>;
    updateState!: (status: string) => Promise<any>;
    constructor({ deviceId, ip, port = 8081, disabled, encryptedData, iv }: TypeConstrucotr) {
        super();
        this.deviceId = deviceId;
        this.ip = ip;
        this.port = port;
        this.entityId = `switch.${deviceId}`;
        this.disabled = disabled;
        this.iv = iv;
        this.encryptedData = encryptedData;
    }
}

LanSwitchController.prototype.setSwitch = async function (status) {
    // let apikey = getDataSync('user.json', ['user', 'apikey']);
    if (this.devicekey && this.selfApikey) {
        const { data } = await setSwitch({
            ip: this.ip,
            port: this.port,
            deviceid: this.deviceId,
            devicekey: this.devicekey,
            selfApikey: this.selfApikey,
            data: JSON.stringify({
                switch: status,
            }),
        });
        if (data && data.error === 0) {
            this.updateState(status);
        }
    }
};

LanSwitchController.prototype.updateState = async function (status) {
    const res = await updateStates(this.entityId, {
        entity_id: this.entityId,
        state: status,
        attributes: {
            restored: true,
            supported_features: 0,
            friendly_name: this.deviceName || this.entityId,
            state: status,
        },
    });
    console.log(res);
};

export default LanSwitchController;
