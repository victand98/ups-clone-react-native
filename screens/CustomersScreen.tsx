import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { RootStackParentList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import { Image, Input } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import { CustomerCard } from "../components";

export type CustomersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParentList>
>;

export const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#59C1CC" }}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />

      {data?.getCustomers
        .filter((customer: CustomerResponse) =>
          customer.value.name.includes(input)
        )
        .map(({ name: id, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={id} name={name} email={email} userId={id} />
        ))}
    </ScrollView>
  );
};
