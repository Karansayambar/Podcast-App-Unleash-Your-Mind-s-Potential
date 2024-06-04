# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- Detailed Explainnation Of FireStore Functions
  Firestore Functions Used
  addDoc
  collection

1. addDoc
   Purpose:

Adds a new document to a specified collection in Firestore with the given data.
Syntax:

javascript
Copy code
import { addDoc } from "firebase/firestore";

// Usage
const docRef = await addDoc(collectionRef, data);
Parameters:

collectionRef: Reference to the collection where the new document will be added.
data: An object representing the data to be stored in the new document.
Example:

javascript
Copy code
const podcastData = {
title: title,
description: desc,
bannerImage: bannerImageUrl,
displayImage: displayImageUrl,
createdBy: auth.currentUser.uid,
};

const docRef = await addDoc(collection(db, "podcasts"), podcastData);
Explanation:

collection(db, "podcasts"): This creates a reference to the podcasts collection in the Firestore database.
podcastData: This is the data object containing all the fields to be stored in the new document.
addDoc: This function adds a new document with the podcastData to the podcasts collection. 2. collection
Purpose:

Creates a reference to a collection in Firestore. This reference is used to perform read and write operations on the collection.
Syntax:

javascript
Copy code
import { collection } from "firebase/firestore";

// Usage
const collectionRef = collection(firestoreInstance, collectionPath);
Parameters:

firestoreInstance: The Firestore instance (usually imported and initialized in your Firebase config file).
collectionPath: A string representing the path of the collection.
Example:

javascript
Copy code
const podcastCollectionRef = collection(db, "podcasts");
Explanation:

db: The Firestore instance.
"podcasts": The name of the collection in the Firestore database.
Detailed Explanation in Context
Let's revisit the relevant part of the CreatePodcast function and explain the Firestore operations:

javascript
Copy code
const handleSubmit = async () => {
console.log("submitted");
if (title && desc && displayImage && bannerImage) {
setLoading(true);
try {
const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}${Date.now()}`);
await uploadBytes(bannerImageRef, bannerImage);
const bannerImageUrl = await getDownloadURL(bannerImageRef);

            const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}${Date.now()}`);
            await uploadBytes(displayImageRef, displayImage);
            const displayImageUrl = await getDownloadURL(displayImageRef);

            const podcastData = {
                title: title,
                description: desc,
                bannerImage: bannerImageUrl,
                displayImage: displayImageUrl,
                createdBy: auth.currentUser.uid,
            };

            const docRef = await addDoc(collection(db, "podcasts"), podcastData);
            setTitle("");
            setDesc("");
            setBannerImage(null);
            setDisplayImage(null);

            toast.success("Podcast Submitted");
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    } else {
        toast.error("All Fields Are Required");
        setLoading(false);
    }

};
Steps Explained
Creating References for File Uploads:

javascript
Copy code
const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}${Date.now()}`);
const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}${Date.now()}`);
These lines create references for storing the banner and display images in Firebase Storage. The path includes the user's UID and a timestamp to ensure uniqueness.
Uploading Files:

javascript
Copy code
await uploadBytes(bannerImageRef, bannerImage);
const bannerImageUrl = await getDownloadURL(bannerImageRef);

await uploadBytes(displayImageRef, displayImage);
const displayImageUrl = await getDownloadURL(displayImageRef);
These lines upload the banner and display images to Firebase Storage and then retrieve their download URLs.
Preparing Data:

javascript
Copy code
const podcastData = {
title: title,
description: desc,
bannerImage: bannerImageUrl,
displayImage: displayImageUrl,
createdBy: auth.currentUser.uid,
};
This object contains all the data that will be stored in the Firestore document.
Adding Document to Firestore:

javascript
Copy code
const docRef = await addDoc(collection(db, "podcasts"), podcastData);
collection(db, "podcasts"): Creates a reference to the podcasts collection in Firestore.
addDoc(collection(db, "podcasts"), podcastData): Adds a new document to the podcasts collection with the data from podcastData.
Summary
collection(db, "podcasts"): Creates a reference to the podcasts collection in Firestore.
addDoc(collection(db, "podcasts"), podcastData): Adds a new document with the specified data to the podcasts collection.
By understanding these Firestore functions and their parameters, you can effectively manage your Firestore database operations within your React application. If you have any more questions or need further clarification on any part, feel free to ask!
s
