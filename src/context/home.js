import React, { useState } from 'react';
import Lottie from 'react-lottie';
import loadingData from '../assets/lotties/loading.json';

export const HomeContext = React.createContext({});

function HomeProvider(props) {

    const [canMessage, setCanMessage] = useState(false);
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
        console.log('rodando');
        console.log(data.children);
        data.key = Math.random();
        if (data.entity == 'bot') {
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

    return (
        <HomeContext.Provider value={{ canMessage, setCanMessage, components, addComponent, setComponents }}>
            {props.children}
        </HomeContext.Provider>
    )
}
export default HomeProvider;