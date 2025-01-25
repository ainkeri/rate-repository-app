import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";
import { useParams } from "react-router-native";

const useReviews = () => {
    let { userId } = useParams();

    const { data, loading, error } = useQuery(GET_REVIEWS, {
        variables: { repositoryId: userId },
        skip: !userId,
    });

    return { data, loading, error };
};

export default useReviews;