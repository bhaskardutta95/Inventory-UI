import * as React from 'react';
import {Text, View} from "react-native";
import { Customer } from '../models/dto';
import { useSQLiteContext } from 'expo-sqlite';


export default function Dashboard() {
    const [customer, setCustomer] = React.useState<Customer[]>([]);

    const db = useSQLiteContext();

    React.useEffect(() => {
        db.withExclusiveTransactionAsync(async () => {
            await getCustomers();
        })
    })

    async function getCustomers() {
        const result = await db.getAllAsync<Customer>('SELECT * FROM customers');
        setCustomer(result);
    }

    return (
        <View>
            <Text>Dashboard</Text>
        </View>
    )
}