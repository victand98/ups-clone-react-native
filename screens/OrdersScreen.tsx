import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image } from "@rneui/themed";
import React, { useLayoutEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { OrderCard } from "../components";
import { useOrders } from "../hooks";
import { RootStackParentList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParentList>
>;

export const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const tw = useTailwind();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = React.useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        containerStyle={tw("h-64 w-full")}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View>
        <Button
          color="pink"
          titleStyle={{
            color: "gray",
            fontWeight: "400",
          }}
          style={[tw("py-2 px-5")]}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? "Showing: Oldest First" : "Showing: Newest First"}
        </Button>

        {orders
          .sort((a, b) => {
            if (ascending)
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            else return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};
