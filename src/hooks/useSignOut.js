import useAuthStorage from "./useAuthStorage";

import { useApolloClient } from "@apollo/client";

const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signOut = async () => {
        const token = await authStorage.getAccessToken()
        if (!token) {
            console.log("no token")
        }
        await authStorage.removeAccessToken()
        apolloClient.resetStore()
    }

    return [signOut];
}

export default useSignOut