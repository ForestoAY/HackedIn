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
      <View style={styles.posts}>
        <FlatList
          data={data}
          keyExtractor={(post) => post.id}
          renderItem={(info) => {
            const { item } = info;
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Detail", {
                      post: item,
                    });
                  }}
                >
                  <View
                    style={{ backgroundColor: "white", marginVertical: 16 }}
                  >
                    <Text style={{ fontWeight: "600", marginBottom: 8 }}>
                      {item.content}
                    </Text>
                    <Image
                      source={{ uri: item.imgUrl }}
                      style={{ width: "100%", height: 200 }}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 8,
                  }}
                >
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "600",
                        marginHorizontal: 8,
                      }}
                    >
                      Like
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "600",
                        marginHorizontal: 8,
                      }}
                    >
                      Comment
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
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
