import { healthy } from "@build-a-git/core";
import { useQuery } from "@tanstack/react-query";

export const HEALTH_QUERY_KEY = ['HEALTH_QUERY'];
export const HEALTH_CHECK_REFETCH = 5000;

export const useHealth = () => useQuery({
    queryKey: HEALTH_QUERY_KEY,
    queryFn: healthy,
    refetchInterval: HEALTH_CHECK_REFETCH
});