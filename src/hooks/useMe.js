import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const getMe = () => {
    const { data, loading, error } = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
    });

    return { data, loading, error };
};

export default getMe;