import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const logo = require("../assets/hacktiv8.png");
const data = require("../data.json");

export default function HomePage({ navigation }) {
  return (
    <>
      <View style={styles.navbar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={logo} style={{ width: 100, height: 100 }} />
          <Text style={{ fontSize: 24, fontWeight: "600" }}>HackedIn</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ paddingHorizontal: 8 }}
            onPress={() => {
              navigation.navigate("Add");
            }}
          >
            <Text style={{ fontSize: 20 }}>Add post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.posts}>
        <FlatList
          data={data}
          keyExtractor={(post) => post.id}
          renderItem={(info) => {
            const { item } = info;
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Detail", {
                    post: item,
                  });
                }}
              >
                <View style={{ backgroundColor: "white", marginVertical: 16 }}>
                  <Text style={{ fontWeight: "600", marginBottom: 8 }}>
                    {item.content}
                  </Text>
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={{ width: "100%", height: 200 }}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 72,
    backgroundColor: "#83B4FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  posts: {
    flex: 1,
    backgroundColor: "lightyellow",
  },
});
