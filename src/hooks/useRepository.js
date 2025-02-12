import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";

const useRepository = () => {
  let { userId } = useParams();

  const data = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: userId },
    skip: !userId,
    fetchPolicy: "cache-and-network",
  });

  return data;
};

export default useRepository;
