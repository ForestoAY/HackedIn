import { Image, Text, TouchableOpacity, View } from "react-native";

export default function DetailPage({ navigation, route }) {
  const { post } = route.params;
  return (
    <>
      <View style={{ backgroundColor: "white", marginVertical: 16 }}>
        <Text style={{ fontWeight: "600", marginBottom: 8 }}>
          {post.content}
        </Text>
        <Image
          source={{ uri: post.imgUrl }}
          style={{ width: "100%", height: 200 }}
        />
      </View>
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
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }} onPress={() => navigation.goBack()}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}