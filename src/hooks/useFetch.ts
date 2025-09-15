import { useState, useEffect } from 'react'


interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export default function useFetch<T = unknown>(url: string, deps: any[] = []): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch data 
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetch(url)
            .then((res: Response) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((json: T) => {
                if (isMounted) setData(json);
            })
            .catch((err: Error) => {
                if (isMounted) setError(err);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, deps);

    return { data, loading, error };
}