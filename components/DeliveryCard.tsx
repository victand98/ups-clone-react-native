import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Divider, Icon } from "@rneui/themed";

type DeliveryCardProps = {
  order: Order;
};

export const DeliveryCard = (props: DeliveryCardProps) => {
  const { order } = props;

  const tw = useTailwind();

  return (
    <Card
      containerStyle={[
        tw("rounded-lg my-2"),
        {
          backgroundColor: "#59C1CC",
          padding: 0,
          paddingTop: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      ]}
    >
      <View>
        <Icon name="box" type="entypo" color="white" />

        <View>
          <Text
            style={[tw("text-white text-center uppercase font-bold text-xs")]}
          >
            {order.carrier} - {order.trackingId}
          </Text>

          <Text style={[tw("text-white text-center font-bold text-lg")]}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>

          <Divider color="white" />
        </View>

        <View style={[tw("mx-auto")]}>
          <Text style={[tw("text-white text-center font-bold mt-5 text-base")]}>
            Address
          </Text>

          <Text style={[tw("text-white text-center text-sm")]}>
            {order.Address} {order.City}
          </Text>

          <Text style={[tw("text-white text-center italic text-sm")]}>
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>
      </View>

      <Divider color="white" />

      <View style={[tw("p-5")]}>
        {order.trackingItems.items.map((item) => (
          <View style={[tw("flex-row justify-between items-center")]}>
            <Text style={[tw("text-sm italic text-white")]}>{item.name}</Text>
            <Text style={[tw("text-white text-xl")]}>x {item.quantity}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};
