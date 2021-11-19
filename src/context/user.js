import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext({});

function UserProvider(props) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('student')) {
            setUser(JSON.parse(localStorage.getItem('student')));
        }else{
            setUser(false);
        }
    }, [user])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider;