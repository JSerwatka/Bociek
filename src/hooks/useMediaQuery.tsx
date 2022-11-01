import { useEffect, useState } from "react";

const getMatches = (query: string): boolean => {
    return window.matchMedia(query).matches;
};
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(getMatches(query));

    function handleChange() {
        setMatches(getMatches(query));
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(query);
        handleChange();

        matchMedia.addEventListener("change", handleChange);

        return () => matchMedia.removeEventListener("change", handleChange);
    }, [query]);

    return matches;
}

export default useMediaQuery;
