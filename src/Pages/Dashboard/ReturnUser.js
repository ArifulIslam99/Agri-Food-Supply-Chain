import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
const ReturnUser = () => {

    const [user, loading, error] = useAuthState(auth);
    const [person, setPerson] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user.email}`)
            .then(res => res.json())
            .then(data => setPerson(data))
    }, [user])


    return{ person }
};

export default ReturnUser;

