// import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import Categories from "../components/categories";
// import axios from "axios";
// import Recipes from "../components/recipes";

// export default function HomeScreen() {
//   const [activeCategory, setActiveCategory] = useState("Chicken");
//   const [categories, setCategories] = useState([]);
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     getCategories();
//     getRecipes();
//   }, []);

//   const handleChangeCategory = (category) => {
//     getRecipes(category);
//     setActiveCategory(category);
//     setMeals([]);
//   };

//   const getCategories = async () => {
//     try {
//       const response = await axios.get(
//         "https://themealdb.com/api/json/v1/1/categories.php"
//       );
//       if (response && response.data) {
//         setCategories(response.data.categories);
//       }
//     } catch (err) {
//       console.log("error: ", err.message);
//     }
//   };

//   const getRecipes = async (category = "Chicken") => {
//     try {
//       const response = await axios.get(
//         `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
//       );
//       if (response && response.data) {
//         setMeals(response.data.meals);
//       }
//     } catch (err) {
//       console.log("error: ", err.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContainer}
//       >
//         <View style={styles.headerContainer}>
//           <Image
//             source={require("../../assets/images/avatar.png")}
//             style={styles.avatar}
//           />
//           <Text style={styles.greetingText}>Hello, Richaaa!</Text>
//         </View>

//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>Make your own food,</Text>
//           <Text style={styles.subtitle}>
//             stay at <Text style={styles.highlight}>home</Text>
//           </Text>
//         </View>

//         <View>
//           {categories.length > 0 && (
//             <Categories
//               categories={categories}
//               activeCategory={activeCategory}
//               handleChangeCategory={handleChangeCategory}
//             />
//           )}
//         </View>

//         <View>
//           <Recipes meals={meals} categories={categories} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF", // white
//   },
//   scrollContainer: {
//     paddingBottom: 50,
//     paddingTop: hp(14), // pt-14 equivalent
//   },
//   headerContainer: {
//     marginHorizontal: wp(4), // mx-4 equivalent
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: hp(2),
//     marginTop: hp(-8.5),
//   },
//   avatar: {
//     height: hp(5),
//     width: hp(5.5),
//   },
//   greetingText: {
//     fontSize: hp(1.7),
//     color: "#52525B", // neutral-600
//     fontWeight: "600", // font-semibold
//     backgroundColor: "#F3F4F6", // gray-100
//     paddingHorizontal: wp(2), // px-2
//     paddingVertical: hp(0.5), // py-1
//     borderRadius: 9999, // full rounded
//     textAlign: "center",
//   },
//   titleContainer: {
//     marginHorizontal: wp(4), // mx-4
//     marginBottom: hp(2), // mb-2
//   },
//   title: {
//     fontSize: hp(3.8),
//     fontWeight: "600", // font-semibold
//     color: "#52525B", // neutral-600
//   },
//   subtitle: {
//     fontSize: hp(3.8),
//     fontWeight: "600", // font-semibold
//     color: "#52525B", // neutral-600
//   },
//   highlight: {
//     color: "#F59E0B", // amber-400
//   },
// });
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../components/categories";
import Articles from "../components/articles";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Technology");

  // Hardcoded categories for news
  const [categories, setCategories] = useState([
    {
      idCategory: "1",
      strCategory: "Technology",
      strCategoryThumb:
        "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      idCategory: "2",
      strCategory: "Sports",
      strCategoryThumb:
        "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      idCategory: "3",
      strCategory: "Business",
      strCategoryThumb:
        "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      idCategory: "4",
      strCategory: "Entertainment",
      strCategoryThumb:
        "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      idCategory: "5",
      strCategory: "Health",
      strCategoryThumb:
        "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
    },
  ]);

  // Keep all articles in state (unfiltered list)
  const [allArticles, setAllArticles] = useState([
    {
      idArticle: "1",
      title: "AI Revolution in Technology",
      description:
        "AI is changing the way we interact with technology and improving our lives.",
      thumbnail:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Technology",
      idCategory: "1",
    },
    {
      idArticle: "2",
      title: "Olympics 2024: What to Expect",
      description:
        "The 2024 Olympics are set to be one of the most competitive events ever.",
      thumbnail:
        "https://images.pexels.com/photos/5687405/pexels-photo-5687405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Sports",
      idCategory: "2",
    },
    {
      idArticle: "3",
      title: "Stock Market Soars",
      description:
        "Business sectors are experiencing a significant surge in stock prices.",
      thumbnail:
        "https://images.pexels.com/photos/5583964/pexels-photo-5583964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Business",
      idCategory: "3",
    },
    {
      idArticle: "4",
      title: "New Marvel Movie Breaks Records",
      description:
        "Marvel’s latest release has broken box office records worldwide.",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1682124853113-d1aad6ae96ef?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Entertainment",
      idCategory: "4",
    },
    {
      idArticle: "5",
      title: "Health Tips for 2024",
      description:
        "Top health experts share their best tips to stay fit and healthy.",
      thumbnail:
        "https://images.pexels.com/photos/4720778/pexels-photo-4720778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Health",
      idCategory: "5",
    },
    {
      idArticle: "6",
      title: "The Future of Blockchain",
      description: "Blockchain is expected to revolutionize many industries.",
      thumbnail:
        "https://images.pexels.com/photos/6781340/pexels-photo-6781340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Technology",
      idCategory: "1",
    },
    {
      idArticle: "7",
      title: "The Rise of Esports",
      description: "Esports is becoming a mainstream phenomenon globally.",
      thumbnail:
        "https://images.pexels.com/photos/5207523/pexels-photo-5207523.jpeg",
      category: "Sports",
      idCategory: "2",
    },
    {
      idArticle: "8",
      title: "New Business Trends in 2024",
      description: "Innovative business practices are reshaping industries.",
      thumbnail:
        "https://images.pexels.com/photos/19797311/pexels-photo-19797311/free-photo-of-2024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Business",
      idCategory: "3",
    },
  ]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  // Filter articles by active category during rendering
  const filteredArticles = allArticles.filter(
    (article) => article.category === activeCategory
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.greetingText}>Hello, Richaaa!</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Stay updated with the latest news,</Text>
          <Text style={styles.subtitle}>
            from around the <Text style={styles.highlight}>world</Text>
          </Text>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        <View>
          {/* Pass the filtered articles to the Articles component */}
          <Articles articles={filteredArticles} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // white
  },
  scrollContainer: {
    paddingBottom: 50,
    paddingTop: hp(14), // pt-14 equivalent
  },
  headerContainer: {
    marginHorizontal: wp(4), // mx-4 equivalent
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginTop: hp(-8.5),
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
  },
  greetingText: {
    fontSize: hp(1.7),
    color: "#52525B", // neutral-600
    fontWeight: "600", // font-semibold
    backgroundColor: "#F3F4F6", // gray-100
    paddingHorizontal: wp(2), // px-2
    paddingVertical: hp(0.5), // py-1
    borderRadius: 9999, // full rounded
    textAlign: "center",
  },
  titleContainer: {
    marginHorizontal: wp(4), // mx-4
    marginBottom: hp(2), // mb-2
  },
  title: {
    fontSize: hp(3.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // neutral-600
  },
  subtitle: {
    fontSize: hp(3.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // neutral-600
  },
  highlight: {
    color: "#F59E0B", // amber-400
  },
});
