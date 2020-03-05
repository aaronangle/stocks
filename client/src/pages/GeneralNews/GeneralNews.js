import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { GET_GENERAL_NEWS } from "../../graphql/query";
import LoadingSpinner from "../../utititlyComponents/LoadingSpinner/LoadingSpinner";

const GeneralNews = () => {

    const { loading, error, data } = useQuery(GET_GENERAL_NEWS);
    if (loading) return (
        <LoadingSpinner />
    )
    if (error) return `Error! ${error.message}`;
    console.log(data)
    return (
        <div></div>
    )
}

export default GeneralNews;