import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function SearchPage() {
  return (
    <>
      <View>
        <TextInput
          style={{
            marginVertical: 8,
            height: 50,
            marginHorizontal: 12,
            paddingHorizontal: 20,
            borderColor: "#83B4FF",
            borderWidth: 1,
            borderRadius: 7,
          }}
          placeholder="Search users"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      {/* List of users */}
      <View
        style={{
          flex: 1,
          marginVertical: 8,
          marginHorizontal: 12,
        }}
      >
        {/* List per user */}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
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
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#83B4FF",
              borderRadius: 5,
              height: 30,
              alignItems: "center",
            }}
          >
            <Icon
              name="plus"
              size={20}
              color="white"
              style={{ marginHorizontal: 4, marginStart: 4 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                marginEnd: 8,
              }}
            >
              Follow
            </Text>
          </TouchableOpacity>
        </View>
        {/* List per user */}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
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
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#83B4FF",
              borderRadius: 5,
              height: 30,
              alignItems: "center",
            }}
          >
            <Icon
              name="plus"
              size={20}
              color="white"
              style={{ marginHorizontal: 4, marginStart: 4 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                marginEnd: 8,
              }}
            >
              Follow
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
