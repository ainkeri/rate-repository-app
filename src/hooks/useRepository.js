import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";

const useRepository = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_REPOSITORY, {
        variables: { repositoryId: id },
    });

    console.log(id)

    return { data, loading, error };
};

export default useRepository;