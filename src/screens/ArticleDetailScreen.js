// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import Loading from "../components/loading";
// import YouTubeIframe from "react-native-youtube-iframe";
// import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

// import { useDispatch, useSelector } from "react-redux"; // Redux hooks
// import { toggleFavorite } from "../redux/favoritesSlice"; // Redux action

// export default function RecipeDetailScreen(props) {
//   let item = props.route.params;
//   const [loading, setLoading] = useState(true);
//   const [meal, setMeal] = useState(null);

//   const dispatch = useDispatch();
//   const favoriteMeals = useSelector((state) => state.favorites.favoriteMeals);
//   const isFavourite = favoriteMeals.some(
//     (favMeal) => favMeal.idMeal === item.idMeal
//   ); // Check by idMeal

//   const navigation = useNavigation();

//   useEffect(() => {
//     getMealData(item.idMeal);
//   }, []);

//   const getMealData = async (id) => {
//     try {
//       const response = await axios.get(
//         `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
//       );
//       if (response && response.data) {
//         setMeal(response.data.meals[0]);
//         setLoading(false);
//       }
//     } catch (err) {
//       console.log("error: ", err.message);
//     }
//   };

//   const ingredientsIndexes = (meal) => {
//     if (!meal) return [];
//     let indexes = [];
//     for (let i = 1; i <= 20; i++) {
//       if (meal["strIngredient" + i]) {
//         indexes.push(i);
//       }
//     }
//     return indexes;
//   };

//   const getYoutubeVideoId = (url) => {
//     const regex = /[?&]v=([^&]+)/;
//     const match = url.match(regex);
//     if (match && match[1]) {
//       return match[1];
//     }
//     return null;
//   };

//   const handleToggleFavorite = () => {
//     dispatch(toggleFavorite(item)); // Pass the whole item (meal) object
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <StatusBar style={"light"} />

//       {/* Recipe Image */}
//       <View style={styles.imageContainer}>
//         <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} />
//       </View>

//       {/* Back Button and Favorite Button */}
//       <Animated.View
//         entering={FadeIn.delay(200).duration(1000)}
//         style={styles.topButtonsContainer}
//       >
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Text>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleToggleFavorite}
//           style={[
//             styles.favouriteButton,
//             {
//               backgroundColor: "white",
//             },
//           ]}
//         >
//           <Text>{isFavourite ? "♥" : "♡"}</Text>
//         </TouchableOpacity>
//       </Animated.View>

//       {/* Meal Description */}
//       {loading ? (
//         <Loading size="large" style={styles.loading} />
//       ) : (
//         <View style={styles.contentContainer}>
//           {/* Name and Area */}
//           <Animated.View
//             entering={FadeInDown.duration(700).springify().damping(12)}
//             style={styles.mealDetailsContainer}
//           >
//             <Text style={styles.mealName}>{meal?.strMeal}</Text>
//             <Text style={styles.mealArea}>{meal?.strArea}</Text>
//           </Animated.View>

//           {/* Miscellaneous */}
//           <Animated.View
//             entering={FadeInDown.delay(100)
//               .duration(700)
//               .springify()
//               .damping(12)}
//             style={styles.miscContainer}
//           >
//             {renderMiscItem("🕒", "35", "Mins")}
//             {renderMiscItem("👥", "03", "Servings")}
//             {renderMiscItem("🔥", "103", "Cal")}
//             {renderMiscItem("🔒", "", "Easy")}
//           </Animated.View>

//           {/* Ingredients */}
//           <Animated.View
//             entering={FadeInDown.delay(200)
//               .duration(700)
//               .springify()
//               .damping(12)}
//             style={styles.sectionContainer}
//           >
//             <Text style={styles.sectionTitle}>Ingredients</Text>
//             <View style={styles.ingredientsList}>
//               {ingredientsIndexes(meal).map((i) => {
//                 return (
//                   <View key={i} style={styles.ingredientItem}>
//                     <View style={styles.ingredientBullet} />
//                     <View style={styles.ingredientTextContainer}>
//                       <Text style={styles.ingredientMeasure}>
//                         {meal["strMeasure" + i]}
//                       </Text>
//                       <Text style={styles.ingredientName}>
//                         {meal["strIngredient" + i]}
//                       </Text>
//                     </View>
//                   </View>
//                 );
//               })}
//             </View>
//           </Animated.View>

//           {/* Instructions */}
//           <Animated.View
//             entering={FadeInDown.delay(300)
//               .duration(700)
//               .springify()
//               .damping(12)}
//             style={styles.sectionContainer}
//           >
//             <Text style={styles.sectionTitle}>Instructions</Text>
//             <Text style={styles.instructionsText}>{meal?.strInstructions}</Text>
//           </Animated.View>

//           {/* Recipe Video */}
//           {/* {meal.strYoutube && (
//             <Animated.View
//               entering={FadeInDown.delay(400)
//                 .duration(700)
//                 .springify()
//                 .damping(12)}
//               style={styles.sectionContainer}
//             >
//               <Text style={styles.sectionTitle}>Recipe Video</Text>
//               <YouTubeIframe
//                 videoId={getYoutubeVideoId(meal.strYoutube)}
//                 height={hp(30)}
//               />
//             </Animated.View>
//           )} */}
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const renderMiscItem = (icon, value, label) => (
//   <View style={styles.miscItem}>
//     <View style={styles.miscIconContainer}>
//       <Text>{icon}</Text>
//     </View>
//     <View style={styles.miscTextContainer}>
//       <Text style={styles.miscValue}>{value}</Text>
//       <Text style={styles.miscLabel}>{label}</Text>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 30,
//   },
//   imageContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   recipeImage: {
//     width: wp(98),
//     height: hp(50),
//     borderRadius: 35,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     marginTop: 4,
//   },
//   topButtonsContainer: {
//     width: "100%",
//     position: "absolute",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingTop: hp(4),
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 50,
//     marginLeft: wp(5),
//     backgroundColor: "white",
//   },
//   favouriteButton: {
//     padding: 8,
//     borderRadius: 50,
//     borderWidth: 1,
//     marginRight: wp(5),
//   },
//   loading: {
//     marginTop: hp(20),
//   },
//   contentContainer: {
//     paddingHorizontal: wp(4),
//     paddingTop: hp(4),
//   },
//   mealDetailsContainer: {
//     marginBottom: hp(2),
//   },
//   mealName: {
//     fontSize: hp(3),
//     fontWeight: "bold",
//     color: "#4B5563", // text-neutral-700
//   },
//   mealArea: {
//     fontSize: hp(2),
//     fontWeight: "500",
//     color: "#9CA3AF", // text-neutral-500
//   },
//   miscContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   miscItem: {
//     flex: 1,
//     backgroundColor: "#FBBF24", // bg-amber-300
//     padding: 8,
//     marginHorizontal: 4,
//     borderRadius: 75,
//     alignItems: "center",
//   },
//   miscIconContainer: {
//     backgroundColor: "white",
//     borderRadius: 50,
//     height: hp(6.5),
//     width: hp(6.5),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   miscTextContainer: {
//     alignItems: "center",
//     paddingVertical: hp(0.5),
//   },
//   miscValue: {
//     fontSize: hp(2),
//     fontWeight: "bold",
//     color: "#4B5563", // text-neutral-700
//   },
//   miscLabel: {
//     fontSize: hp(1.3),
//     fontWeight: "bold",
//     color: "#4B5563", // text-neutral-700
//   },
//   sectionContainer: {
//     marginBottom: hp(2),
//   },
//   sectionTitle: {
//     fontSize: hp(2.5),
//     fontWeight: "bold",
//     color: "#4B5563", // text-neutral-700
//   },
//   ingredientsList: {
//     marginLeft: wp(2),
//   },
//   ingredientItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp(1),
//   },
//   ingredientBullet: {
//     backgroundColor: "#FBBF24", // bg-amber-300
//     borderRadius: 50,
//     height: hp(1.5),
//     width: hp(1.5),
//   },
//   ingredientTextContainer: {
//     flexDirection: "row",
//     marginLeft: wp(2),
//   },
//   ingredientMeasure: {
//     fontSize: hp(1.7),
//     fontWeight: "700",
//     color: "#4B5563", // text-neutral-700
//   },
//   ingredientName: {
//     fontSize: hp(1.7),
//     fontWeight: "500",
//     color: "#6B7280", // text-neutral-600
//   },
//   instructionsText: {
//     fontSize: hp(1.6),
//     color: "#4B5563", // text-neutral-700
//     textAlign: "justify",
//     lineHeight: hp(2.5),
//   },
// });
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { toggleFavorite } from "../redux/favoritesSlice"; // Redux action

export default function ArticleDetailScreen(props) {
  const article = props.route.params; // Article passed from previous screen
  const [loading, setLoading] = useState(false); // Assume data is already passed in navigation

  const dispatch = useDispatch();
  const favoriteArticles = useSelector(
    (state) => state.favorites.favoriteArticles
  );
  const isFavourite = favoriteArticles?.some(
    (favArticle) => favArticle.idArticle === article.idArticle
  ); // Check by idArticle

  const navigation = useNavigation();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(article)); // Dispatch the article to favorites
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <StatusBar style={"light"} />

      {/* Article Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: article.thumbnail }}
          style={styles.articleImage}
        />
      </View>

      {/* Back Button and Favorite Button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={styles.topButtonsContainer}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[
            styles.favoriteButton,
            {
              backgroundColor: "white",
            },
          ]}
        >
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Article Description */}
      {loading ? (
        <Loading size="large" style={styles.loading} />
      ) : (
        <View style={styles.contentContainer}>
          {/* Title and Category */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            style={styles.articleDetailsContainer}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleCategory}>{article.category}</Text>
          </Animated.View>

          {/* Description */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            style={styles.sectionContainer}
          >
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{article.description}</Text>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  articleImage: {
    width: wp(98),
    height: hp(40),
    borderRadius: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginTop: 4,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: wp(5),
  },
  loading: {
    marginTop: hp(20),
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  articleDetailsContainer: {
    marginBottom: hp(2),
  },
  articleTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
  articleCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF", // text-neutral-500
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
  descriptionText: {
    fontSize: hp(1.8),
    color: "#4B5563", // text-neutral-700
    textAlign: "justify",
    lineHeight: hp(2.5),
  },
});
