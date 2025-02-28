import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";

export default function NewsFormScreen({ route, navigation }) {
    const { articleToEdit, articleIndex, onArticleEdited } = route.params || {};
    const [title, setTitle] = useState(articleToEdit ? articleToEdit.title : "");
    const [image, setImage] = useState(articleToEdit ? articleToEdit.image : "");
    const [description, setDescription] = useState(
        articleToEdit ? articleToEdit.description : ""
    );

    const saveArticle = async () => {
        const newArticle = { title, image, description };
        try {
            const existingArticles = await AsyncStorage.getItem("customArticles");
            const articles = existingArticles ? JSON.parse(existingArticles) : [];

            // If editing an article, update it; otherwise, add a new one
            if (articleToEdit !== undefined) {
                articles[articleIndex] = newArticle;
                await AsyncStorage.setItem("customArticles", JSON.stringify(articles));
                if (onArticleEdited) onArticleEdited(); // Notify the edit
            } else {
                articles.push(newArticle); // Add new article
                await AsyncStorage.setItem("customArticles", JSON.stringify(articles));
            }

            navigation.goBack(); // Return to the previous screen
        } catch (error) {
            console.error("Error saving the article:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
                style={styles.input}
            />
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
            )}
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
                style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
            />
            <TouchableOpacity onPress={saveArticle} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Article</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(4),
    },
    input: {
        marginTop: hp(4),
        borderWidth: 1,
        borderColor: "#ddd",
        padding: wp(.5),
        marginVertical: hp(1),
    },
    image: {
        width: 200,
        height: 150,
        margin: wp(2),
    },
    imagePlaceholder: {
        height: hp(20),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: hp(1),
        borderWidth: 1,
        borderColor: "#ddd",
        textAlign: "center",
        padding: wp(2),
    },
    saveButton: {
        backgroundColor: "#4F75FF",
        padding: wp(.5),
        alignItems: "center",
        borderRadius: 5,
        marginTop: hp(2),
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
