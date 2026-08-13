import React from "react";
import {LuCloudFog, LuCloudSun, LuCloudAlert} from 'react-icons/lu'
import { useHealth } from "../../hooks/health";

export const HealthIcon = () => {
    const { data, isLoading, isError } = useHealth();

    const determineHealth = () => {
        if (data) {
            return <LuCloudSun />
        }

        return <LuCloudAlert />
    }

    return determineHealth()

}