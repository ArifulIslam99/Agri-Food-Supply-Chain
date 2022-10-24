import React, { useEffect, useState } from 'react';

const useLogistic = () => {
    const [logistics, setlogistics] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/distributors")
            .then(res => res.json())
            .then(data => setlogistics(data))
    }, [logistics])

    return {logistics};
};

export default useLogistic;