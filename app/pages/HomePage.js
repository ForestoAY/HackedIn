import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
                <View style={{ backgroundColor: "white", marginBottom: 32 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      marginBottom: 8,
                      paddingHorizontal: 12,
                      fontWeight: "600",
                    }}
                  >
                    User 1
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detail", {
                        post: item,
                      });
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 8,
                          paddingHorizontal: 12,
                        }}
                      >
                        {item.content}
                      </Text>
                      <Image
                        source={{ uri: item.imgUrl }}
                        style={{ width: "100%", height: 400 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 4,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        marginHorizontal: 8,
                        fontSize: 16,
                        color: "gray",
                      }}
                    >
                      100 likes
                    </Text>
                    <Text
                      style={{
                        marginHorizontal: 8,
                        fontSize: 16,
                        color: "gray",
                      }}
                    >
                      7 comments
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 4,
                      paddingBottom: 8,
                    }}
                  >
                    <TouchableOpacity>
                      <Icon
                        name="thumbs-o-up"
                        size={32}
                        color="black"
                        style={{ marginHorizontal: 8 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon
                        name="comment-o"
                        size={32}
                        color="black"
                        style={{ marginHorizontal: 8 }}
                      />
                    </TouchableOpacity>
                  </View>
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
    backgroundColor: "lightgray",
  },
});
