import * as React from 'react';
import {CustomerDto} from '../models/dto';
import { useSQLiteContext } from 'expo-sqlite';
import { TouchableOpacity, Text, View, TextInput,Button } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function AddCustomer({
    insertCustomer,
}: {
    insertCustomer: (customer: CustomerDto) => Promise<void>;
}) {
    const [isAddingCustomer, setIsAddingCustomer] = React.useState<boolean>(false);
    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [customerName, setCustomerName] = React.useState<string>('');
    const [phoneNumber, setPhoneNumber] = React.useState<number>();
    const [email, setEmail] = React.useState<string>('');
    const [created_date, setCreatedDate] = React.useState<Date>();
    const [updated_date, setUpdatedDate] = React.useState<Date>();

    const db = useSQLiteContext();

    async function handleAddCustomer() {
        console.log({
            customer_name: customerName,
            phone_number: Number(phoneNumber),
            email: email,
            created_date: new Date(),
            updated_date: new Date(),
        })

        // await insertCustomer({
        //     customer_name: customerName,
        //     phone_number: Number(phoneNumber),
        //     email: email,
        //     created_date: new Date(),
        //     updated_date: new Date(),
        // });

            // @ts-ignore
        await insertCustomer({
            customer_name: customerName,
            phone_number: Number(phoneNumber),
            email: email,
            created_date: new Date(),
            updated_date: new Date(),
    });
        setCustomerName('');
        setPhoneNumber(0);
        setEmail('');
        setCreatedDate(new Date());
        setUpdatedDate(new Date());
    }

    return (
        <View style={{marginBottom: 15}}>
            {isAddingCustomer ? (
                <View>
                    <TextInput
                        placeholder="Customer Name"
                        value={customerName}
                        onChangeText={setCustomerName}
                    />
                    <TextInput
                        placeholder="Phone Number"
                        value={phoneNumber?.toString()}
                        // onChangeText={"setPhoneNumber"}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Button title="Add Customer" onPress={handleAddCustomer} />
                </View>
            ):(
                <AddButton setIsAddingCustomer={setIsAddingCustomer}/>
            )}
        </View>
    )
}

function AddButton({
    setIsAddingCustomer,
}: {
    setIsAddingCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}){
    return(
        <TouchableOpacity
            onPress={() => setIsAddingCustomer(true)}
            activeOpacity={0.6}
            style = {{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#000",
            }}
            >
            <MaterialIcons name="add" size={24} color="black" />
            <Text style={{fontWeight:"700", color:"black"}}>Add Customer</Text>
            </TouchableOpacity>
    )
}