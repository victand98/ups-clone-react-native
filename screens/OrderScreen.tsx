import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { DeliveryCard, OrdersScreenNavigationProp } from "../components";
import { RootStackParentList } from "../navigator/RootNavigator";

type OrderScreenRouteProp = RouteProp<RootStackParentList, "Order">;

export const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: "#EB6A7C",
      headerTitleStyle: { color: "black" },
      headerBackTitle: "Deliveries",
    });
  }, []);

  return (
    <View style={tw("-mt-2")}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};
