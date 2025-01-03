import React, { useState } from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ navigation, route }) => {
    const [letter, setLetter] = useState(route.params.key);

    const handleSave = () => {
        let indexnum = route.params.type === "Vowels" ? 0 : 1;
        datasource[indexnum].data[route.params.index].key = letter;

        // After saving, update AsyncStorage
        AsyncStorage.setItem("alphadata", JSON.stringify(datasource));

        navigation.navigate("Home");
    };

    const handleDelete = () => {
        let indexnum = route.params.type === "Vowels" ? 0 : 1;

        Alert.alert("Are You Sure?", '', [
            {
                text: 'Yes',
                onPress: () => {
                    // Remove the item at the specified index
                    datasource[indexnum].data.splice(route.params.index, 1);

                    // Update AsyncStorage with the modified data
                    AsyncStorage.setItem("alphadata", JSON.stringify(datasource));

                    // Navigate back to the Home screen
                    navigation.navigate("Home");
                }
            },
            { text: 'No' }
        ]);
    };

    return (
        <View>
            <Text>Letter:</Text>
            <TextInput
                value={letter}
                maxLength={1}
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setLetter(text)}
            />
            <View style={{ flexDirection: "row" }}>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button title='Save' onPress={handleSave} />
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button title='Delete' onPress={handleDelete} />
                </View>
            </View>
        </View>
    );
};

export default Edit;

