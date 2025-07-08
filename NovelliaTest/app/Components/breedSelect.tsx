import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../Helpers/styleSheet";
import CheckBox from "./checkbox";
import { useSelector } from "react-redux";
import { setSelected, setTest } from "@/Redux/reducers/SystemSettings";

export default function BreedSelect({text, onPress} : any){
    const [isPressed, setIsPressed] = useState(false);
    const [icon, setIcon] = useState(require('../Assets/box.png'));

    const isDogSelected = useSelector((store: any)=> {
        return store.systemSettings.isDogSelected;
    });
    const isCatSelected = useSelector((store: any)=> {
        return store.systemSettings.isCatSelected;
    });
    const isBirdSelected = useSelector((store: any)=> {
        return store.systemSettings.isBirdSelected;
    });
    const isBunnySelected = useSelector((store: any)=> {
        return store.systemSettings.isBunnySelected;
    });

    useEffect(()=> {
        setIcon(isPressed? require('../Assets/checked.png') : require('../Assets/box.png'))
    },[isPressed]);

    function optionSelect(){
        //dispatch(setSelected({isDogSelected: true, isCatSelected: false, isBirdSelected: false, isBunnySelected: false}))
        //dispatch(setTest({}));
    }

    return(
        <View>
            <CheckBox text={"Dog"} onPress={optionSelect} isPressed={isDogSelected}/>
            <CheckBox text={"Cat"} onPress={optionSelect} isPressed={isCatSelected}/>
            <CheckBox text={"Bird"} onPress={optionSelect} isPressed={isBirdSelected}/>
            <CheckBox text={"Bunny"} onPress={optionSelect} isPressed={isBunnySelected}/>
        </View>
    )
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
