import * as React from 'react';
import {CustomerDto} from '../models/dto';
import { TouchableOpacity, Text, View, TextInput,Button } from 'react-native';

export default function CustomerList({
    customers, 
    deleteCustomer,
} : {
    customers : CustomerDto[];
    deleteCustomer:(id: number) => Promise<void>; 
}){
    return (
        <View>
            {customers.map((customer) => {
                return (
                    <TouchableOpacity
                        key = {customer.customer_id}
                        activeOpacity={.7}
                        onLongPress={() => deleteCustomer(customer.customer_id)}
                    >
                    <Text> {customer.customer_id} | {customer.customer_name} | {customer.phone_number}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>

    )
}