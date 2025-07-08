import { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../Helpers/styleSheet";

export default function AnimalTypeSelect(){
    const notSelected = require('../Assets/box.png');
    const selected = require('../Assets/checked.png');

    const [isDogSelected, setIsDogSelected] = useState(false);
    const [isCatSelected, setIsCatSelected] = useState(false);
    const [isBirdSelected, setIsBirdSelected] = useState(false);
    const [isBunnySelected, setIsBunnySelected] = useState(false);

    return(
        <View>
            <TouchableOpacity style={{}} onPress={()=>{setIsDogSelected(!isDogSelected); setIsCatSelected(false); setIsBirdSelected(false); setIsBunnySelected(false)}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={isDogSelected? selected:notSelected}
                        style={{ alignSelf: 'center', marginRight: 15}}
                    />
                    <Text style={styles.bodyText}>Dog</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={()=>{setIsDogSelected(false); setIsCatSelected(!isCatSelected); setIsBirdSelected(false); setIsBunnySelected(false)}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={isCatSelected? selected:notSelected}
                        style={{ alignSelf: 'center', marginRight: 15}}
                    />
                    <Text style={styles.bodyText}>Cat</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={()=>{setIsDogSelected(false); setIsCatSelected(false); setIsBirdSelected(!isBirdSelected); setIsBunnySelected(false)}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={isBirdSelected? selected:notSelected}
                        style={{ alignSelf: 'center', marginRight: 15}}
                    />
                    <Text style={styles.bodyText}>Bird</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={()=>{setIsDogSelected(false); setIsCatSelected(false); setIsBirdSelected(false); setIsBunnySelected(!isBunnySelected)}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={isBunnySelected? selected:notSelected}
                        style={{ alignSelf: 'center', marginRight: 15}}
                    />
                    <Text style={styles.bodyText}>Bunny</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}
