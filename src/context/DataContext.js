import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({children}) => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3500/posts");
    
    useEffect(()=> { 
        setPosts(data);
    },[data]);

    useEffect(()=> {
        const filteredResults = posts.filter(post=> (
            (post.body.toLowerCase()).includes(search.toLocaleLowerCase())
            || (post.title.toLowerCase()).includes(search.toLocaleLowerCase())
        ));

        setSearchResults(filteredResults.reverse()); // to see old searched results first
    }, [posts, search]);

    return (

        <DataContext.Provider value={{
            search, setSearch, posts,
            searchResults, fetchError, isLoading, setPosts
            
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;