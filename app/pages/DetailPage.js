import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DetailPage({ navigation, route }) {
  const { post } = route.params;
  return (
    <>
      <View style={{ backgroundColor: "white", marginVertical: 16 }}>
        <View>
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
          <Text
            style={{
              fontSize: 16,
              marginBottom: 8,
              paddingHorizontal: 12,
            }}
          >
            {post.content}
          </Text>
          <Image
            source={{ uri: post.imgUrl }}
            style={{ width: "100%", height: 400 }}
          />
        </View>
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
      {/* Section Komentar */}
      <View>
        {/* Komentar 1 */}
        <View style={{ marginVertical: 8 }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 8,
              paddingHorizontal: 12,
              fontWeight: "600",
            }}
          >
            User 399
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 8,
              paddingHorizontal: 12,
              fontWeight: "300",
            }}
          >
            Komentar satu
          </Text>
        </View>
        {/* Komentar 2 */}
        <View style={{ marginVertical: 8 }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 8,
              paddingHorizontal: 12,
              fontWeight: "600",
            }}
          >
            User 399
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 8,
              paddingHorizontal: 12,
              fontWeight: "300",
            }}
          >
            Komentar kedua hehe
          </Text>
        </View>
      </View>
      {/* Go back button */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: 40,
        }}
      >
        <TouchableOpacity
          style={{
            marginVertical: 25,
            backgroundColor: "#83B4FF",
            height: 45,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
