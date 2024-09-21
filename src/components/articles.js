import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { useNavigation } from "@react-navigation/native";

export default function Articles({ categories, articles }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest News</Text>
      <View>
        {categories.length === 0 || articles.length === 0 ? (
          <Loading size="large" style={styles.loading} />
        ) : (
          <MasonryList
            data={articles}
            keyExtractor={(item) => item.idArticle}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <ArticleCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={[
          styles.cardContainer,
          { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
        ]}
        onPress={() => navigation.navigate("ArticleDetail", { ...item })}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={[
            styles.articleImage,
            { height: index % 3 === 0 ? hp(25) : hp(35) },
          ]}
        />
        <Text style={styles.articleText}>
          {item.title.length > 20
            ? item.title.slice(0, 20) + "..."
            : item.title}
        </Text>
        <Text style={styles.articleDescription}>
          {item.description.length > 40
            ? item.description.slice(0, 40) + "..."
            : item.description}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
  },
  articleImage: {
    width: "100%",
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280", // gray-500
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
});
