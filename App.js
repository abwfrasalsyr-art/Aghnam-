import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";

export default function App() {
  const [page, setPage] = useState("home");
  const [buyerID, setBuyerID] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", type: "أغنام", price: "" });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (!buyerID) {
      const randomId = Math.floor(Math.random() * 1000000);
      setBuyerID(randomId);
    }
  }, []);

  const types = ["أغنام", "إبل", "أبقار", "دجاج"];

  const addProduct = () => {
    if (form.name && form.price) {
      setProducts([...products, form]);
      setForm({ name: "", type: "أغنام", price: "" });
    }
  };

  return (
    <View style={styles.container}>
      {page === "home" && (
        <View>
          <Text style={styles.title}>مرحباً بك 👋</Text>
          <Text style={styles.subtitle}>اختر دورك:</Text>
          <TouchableOpacity style={styles.box} onPress={() => setPage("buyer")}>
            <Text style={styles.text}>المشتري</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => setPage("seller")}>
            <Text style={styles.text}>البائع</Text>
          </TouchableOpacity>
        </View>
      )}

      {page === "buyer" && (
        <View>
          <Text style={styles.title}>مرحباً أيها المشتري</Text>
          <Text style={styles.subtitle}>اختر نوع المنتج الذي ترغب به:</Text>
          {types.map((item) => (
            <TouchableOpacity key={item} style={styles.box}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.buyerId}>رقمك الفريد: {buyerID}</Text>
          <TouchableOpacity onPress={() => setPage("home")} style={styles.backBtn}>
            <Text style={styles.text}>رجوع</Text>
          </TouchableOpacity>
        </View>
      )}

      {page === "seller" && (
        <View>
          <Text style={styles.title}>مرحباً أيها البائع</Text>
          <Text style={styles.subtitle}>أضف منتج جديد:</Text>
          <TextInput
            placeholder="اسم المنتج"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="السعر"
            value={form.price}
            onChangeText={(text) => setForm({ ...form, price: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addProduct}>
            <Text style={styles.text}>إضافة</Text>
          </TouchableOpacity>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <View style={styles.productBox}>
                <Text style={styles.text}>{item.name} - {item.type} - {item.price} ريال</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity onPress={() => setPage("home")} style={styles.backBtn}>
            <Text style={styles.text}>رجوع</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  box: {
    backgroundColor: "#4CAF50",
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  buyerId: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  backBtn: {
    marginTop: 20,
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: 200,
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  productBox: {
    backgroundColor: "#ddd",
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
});
