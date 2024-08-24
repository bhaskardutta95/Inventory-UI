import * as React from 'react';
import {ScrollView, Text, View} from "react-native";
import { CustomerDto } from '../models/dto';
import { useSQLiteContext } from 'expo-sqlite';
import AddCustomer from '../components/Customer';
import CustomerList from '../components/CustomerList';


export default function Dashboard() {
    const [customer, setCustomer] = React.useState<CustomerDto[]>([]);

    const db = useSQLiteContext();

    React.useEffect(() => {
        db.withTransactionAsync(async () => {
            await getCustomers();
        })
    })

    async function getCustomers() {
        const result = await db.getAllAsync<CustomerDto>('SELECT * FROM customer');
        setCustomer(result);
    }

    async function deleteCustomer(id: number){
        db.withTransactionAsync(async() => {
            await db.runAsync(`DELETE FROM customer WHERE customer_id = ?`, [id]);
            await getCustomers();
        })
    }


    async function insertCustomer(customer: CustomerDto) {
        db.withTransactionAsync(async () => {
            await db.runAsync(`INSERT INTO customer (customer_name, phone_number, email, created_date, updated_date) VALUES ( ?, ?, ?, ?, ?)`, 
                [
                    customer.customer_name,
                    customer.phone_number,
                    customer.email,
                    customer.created_date.toString(),
                    customer.updated_date.toString()
                ]
            );
            await getCustomers();
        })
    }

    return (
        <ScrollView contentContainerStyle={{padding: 15, paddingVertical:170}}>
            <Text>Dashboard</Text>
            <AddCustomer insertCustomer={insertCustomer}/>
            <Text> --CUSTOMER LIST-- </Text>
            <CustomerList
                customers={customer}
                deleteCustomer={deleteCustomer}
            />
        </ScrollView>
    )
}