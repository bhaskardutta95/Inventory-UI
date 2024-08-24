import * as React from 'react';
import {CustomerDto} from '../models/dto';
import { TouchableOpacity, Text, View, TextInput,Button } from 'react-native';
import CustomerListItem from './CustomerListItem';

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
                        <CustomerListItem
                            customer={customer}/>

                    </TouchableOpacity>
                )
            })}
        </View>

    )
}