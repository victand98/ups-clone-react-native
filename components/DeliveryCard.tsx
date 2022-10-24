import { Card, Divider, Icon } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useTailwind } from "tailwind-rn/dist";

type DeliveryCardProps = {
  order: Order;
  fullWidth?: boolean;
};

export const DeliveryCard = (props: DeliveryCardProps) => {
  const { order, fullWidth = false } = props;

  const tw = useTailwind();

  return (
    <Card
      containerStyle={[
        tw(`${fullWidth ? "rounded-none m-0" : "rounded-lg"} my-2`),
        {
          backgroundColor: fullWidth ? "#EB6A7C" : "#59C1CC",
          padding: 0,
          paddingTop: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      ]}
    >
      <View style={fullWidth && { height: "100%" }}>
        <Icon name="box" type="entypo" color="white" />

        <View style={[tw("items-start p-5 -mt-3")]}>
          <View style={tw("mx-auto")}>
            <Text
              style={[tw("text-white text-center uppercase font-bold text-xs")]}
            >
              {order.carrier} - {order.trackingId}
            </Text>

            <Text style={[tw("text-white text-center font-bold text-lg")]}>
              Expected Delivery:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>

            <Divider color="white" />
          </View>

          <View style={[tw("mx-auto pb-5")]}>
            <Text
              style={[tw("text-white text-center font-bold mt-5 text-base")]}
            >
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
            <View
              style={[tw("flex-row justify-between items-center")]}
              key={item.item_id}
            >
              <Text style={[tw("text-sm italic text-white")]}>{item.name}</Text>
              <Text style={[tw("text-white text-xl")]}>x {item.quantity}</Text>
            </View>
          ))}
        </View>

        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[tw("w-full"), { flexGrow: 1 }, !fullWidth && { height: 200 }]}
        >
          {!!order.Lat && !!order.Lng && (
            <Marker
              coordinate={{ latitude: order.Lat, longitude: order.Lng }}
              title={"Delivery Location"}
              description={order.Address}
              identifier={"destination"}
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};
