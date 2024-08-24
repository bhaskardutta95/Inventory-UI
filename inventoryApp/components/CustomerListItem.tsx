import { TouchableOpacity, Text, View, TextInput,Button } from 'react-native';
import { CustomerDto } from '../models/dto';
import Card from './ui/Card';

interface CustomerListItemProps {
    customer: CustomerDto;
}

export default function CustomerListItem({ customer }: CustomerListItemProps) {
    return (
        <Card>
            <Text> 
                ID: {customer.customer_id} NAME: {customer.customer_name} Phone: {customer.phone_number}
            </Text>
        </Card>
    )
}