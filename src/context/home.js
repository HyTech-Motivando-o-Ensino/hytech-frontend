import React, { useState } from 'react';
import Lottie from 'react-lottie';
import loadingData from '../assets/lotties/loading.json';

export const HomeContext = React.createContext({});

function HomeProvider(props) {

    const BOT = 'bot';
    const [allData, setAllData] = useState({});
    const [components, setComponents] = useState([]);

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loadingData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    const addComponent = (data) => {
        data.key = Math.random();
        if (data.entity == BOT) {
            setComponents((prev) => [...prev, { entity: data.entity, children: (<Lottie options={defaultOptions} fill="white" height={100} width={100}/>) }]);
            setTimeout(() => {
                setComponents((prev) => {
                    prev[prev.length - 1] = data;
                    return [...prev]
                });
            }, 700);
        }else{
            setComponents((prev) => [...prev, data]);
        }
    };

    const addData = (key, value) => {
        setAllData((prev) => {
            prev[key] = value;
            return prev;
        })
    }
    return (
        <HomeContext.Provider value={{ components, addComponent, setComponents, allData, addData }}>
            {props.children}
        </HomeContext.Provider>
    )
}
export default HomeProvider;