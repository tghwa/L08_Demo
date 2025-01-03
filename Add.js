import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = ({navigation, route}) => {
    const[letter,setLetter] = useState("");
    const[type,setType] = useState("Vowels");

    const setData = async (value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    };

    return (
        <View>
            <StatusBar/>
            <Text>Letter:</Text>
            <TextInput maxLength={1} style={{borderWidth:1}} onChangeText={(text)=>setLetter(text)}/>
            <RNPickerSelect
                default={{label:"Vowels", value:"Vowels"}}
                onValueChange={(value)=>setType(value)}
                items={[
                    {label:"Vowels", value:"Vowels"},
                    {label:"Consonants", value:"Consonants"}
                ]}
            />
            <Button title='Submit'
                    onPress={()=>{
                        let mydata = JSON.parse(route.params.datastring);
                        let item = {key:letter};
                        let indexnum = 1;
                        if(type=="Vowels") {
                            indexnum = 0;
                        }
                        mydata[indexnum].data.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                        //datasource[indexnum].data.push(item);
                        //navigation.navigate("Home")
                    }
                    }
            />
        </View>
    );
};

export default Add;
