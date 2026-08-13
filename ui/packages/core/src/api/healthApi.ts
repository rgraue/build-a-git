import {config} from '../utils/config'

export interface HealthPingResponse {
    status: 'up' | 'down'
}

export const healthy = async () => {
    const response = await fetch(`${config().serverUrl}/health`, {
        method: 'GET'
    });

    if (!response.ok) {
        return false;
    }

    const json = await response.json() as HealthPingResponse;
    return json.status === 'up';
}

