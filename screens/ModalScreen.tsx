import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { DeliveryCard } from "../components";
import { useCustomerOrders } from "../hooks";
import { RootStackParentList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParentList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParentList, "MyModal">;

export const ModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={tw("absolute right-5 top-12 z-10")}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <View style={[tw("py-5 border-b"), { borderColor: "#59C1CC" }]}>
          <Text style={[tw("text-center text-xl font-bold")]}>{name}</Text>
          <Text style={[tw("text-center italic text-sm")]}>deliveries</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item }) => <DeliveryCard order={item} />}
      />
    </View>
  );
};
