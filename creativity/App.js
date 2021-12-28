import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { Ball } from "./src/Ball";
import { Deck } from "./src/Deck";

export default function App() {
  const renderCard = (item) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri: item.uri,
          }}
        />
        <Text>I can customize the card</Text>

        <Button
          icon={{ name: "code" }}
          background="#03A9F4"
          title="View Now!"
        />
      </Card>
    );
  };
  const DATA = [
    {
      id: 1,
      text: "Card #1",
      uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 2,
      text: "Card #2",
      uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 3,
      text: "Card #3",
      uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 4,
      text: "Card #4",
      uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 5,
      text: "Card #5",
      uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 6,
      text: "Card #6",
      uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 7,
      text: "Card #7",
      uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 8,
      text: "Card #8",
      uri: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];

  return (
    <View style={styles.container}>
      <Deck data={DATA} renderCard={renderCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
